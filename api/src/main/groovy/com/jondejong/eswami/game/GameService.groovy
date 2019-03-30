package com.jondejong.eswami.game

import com.jondejong.eswami.command.CreateGameCommand
import com.jondejong.eswami.model.tables.pojos.Selection
import ratpack.exec.Promise

import javax.inject.Inject

class GameService {

    GameRepository gameRepository
    SelectionRepository selectionRepository

    @Inject
    GameService(GameRepository gameRepository, SelectionRepository selectionRepository) {
        this.gameRepository = gameRepository
        this.selectionRepository = selectionRepository
    }

    Promise<List<Game>> list() {
        gameRepository.list()
    }

    Promise<List<Game>> byWeek(Integer week) {
        gameRepository.byWeek(week)
    }

    Promise<SwamiGame> createGame(CreateGameCommand command) {
        UUID favorite = UUID.randomUUID()
        UUID underdog = UUID.randomUUID()
        SwamiGame game = SwamiGame.fromCommand(command)
                .withFavorite(favorite)
                .withUnderdog(underdog)

        gameRepository.saveGame(game)
        .flatMap {
            selectionRepository.saveSelections(
                    [
                            new SwamiSelection(
                                    game: game.id,
                                    id: favorite,
                                    favorite: true,
                                    team: command.favoriteId,
                                    home: command.favoriteIsHome
                            ),
                            new SwamiSelection(
                                    game: game.id,
                                    id: underdog,
                                    favorite: false,
                                    team: command.underdogId,
                                    home: command.underdogIsHome
                            )
                    ]
            )
        }.map {
            game
        } as Promise<SwamiGame>
    }
}

