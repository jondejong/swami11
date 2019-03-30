package com.jondejong.eswami.game

import com.jondejong.eswami.command.CreateGameCommand

class SwamiGame {

    static fromGame(Game game) {
        new SwamiGame(
                id: game.id,
                week: game.week,
                favorite: game.favoriteId,
                underdog: game.underdogId,
                day: game.day,
                spread: game.spread
        )
    }

    static fromCommand(CreateGameCommand command) {
        new SwamiGame(
                id: UUID.randomUUID(),
                week: command.week,
                day: command.day,
                spread: command.spread
        )
    }

    SwamiGame withFavorite(UUID id) {
        this.favorite = id
        return this
    }

    SwamiGame withUnderdog(UUID id) {
        this.underdog = id
        return this
    }

    UUID id
    Integer week
    UUID favorite
    UUID underdog
    String day
    Float spread
}
