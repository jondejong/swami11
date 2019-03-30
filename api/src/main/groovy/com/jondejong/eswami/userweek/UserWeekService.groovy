package com.jondejong.eswami.userweek

import com.jondejong.eswami.game.Game
import com.jondejong.eswami.game.GameRepository
import com.jondejong.eswami.model.tables.pojos.UserWeek
import com.jondejong.eswami.model.tables.pojos.UserWeekSelection
import com.jondejong.eswami.model.tables.pojos.UserWeekWatched
import ratpack.exec.Promise
import ratpack.func.Pair

import javax.inject.Inject

class UserWeekService {

    GameRepository gameRepository
    WatchedSelectionRepository watchedSelectionRepository
    SelectedSelectionRepository selectedSelectionRepository
    UserWeekRepository userWeekRepository

    @Inject
    UserWeekService(GameRepository gameRepository, WatchedSelectionRepository watchedSelectionRepository, SelectedSelectionRepository selectedSelectionRepository, UserWeekRepository userWeekRepository) {
        this.gameRepository = gameRepository
        this.watchedSelectionRepository = watchedSelectionRepository
        this.selectedSelectionRepository = selectedSelectionRepository
        this.userWeekRepository = userWeekRepository
    }

    Promise removeSelection(UUID user, UUID selection) {
        userWeekRepository.get(user, selection)
        .flatMap { UserWeek userWeek ->
            selectedSelectionRepository.delete(new UserWeekSelection(selection, userWeek.id))
        }
    }

    Promise removeWatch(UUID user, UUID selection) {
        userWeekRepository.get(user, selection)
                .flatMap { UserWeek userWeek ->
            watchedSelectionRepository.delete(new UserWeekWatched(selection, userWeek.id))
        }
    }

    Promise<UserWeekSelection> addSelection(UUID user, UUID selection) {
        userWeekRepository.get(user, selection)
        .flatMap{UserWeek userWeek ->
            selectedSelectionRepository.save(new UserWeekSelection(selection, userWeek.id))
        } as Promise<UserWeekSelection>
    }

    Promise<UserWeekWatched> addWatch(UUID user, UUID selection) {
        userWeekRepository.get(user, selection)
        .flatMap{UserWeek userWeek ->
            watchedSelectionRepository.save(new UserWeekWatched(selection, userWeek.id))
        } as Promise<UserWeekWatched>
    }

    Promise<SwamiUserWeek> byUserAndWeek(UUID userId, Integer week) {
        watchedSelectionRepository.byUserAndWeek(userId, week)
        .flatLeft { selectedSelectionRepository.byUserAndWeek(userId, week) }
        .map { Pair<List<UserWeekSelection>, List<UserWeekWatched>> pair ->
            [
                    selectedIds: pair.left.collect { it.selection },
                    watchedIds : pair.right.collect { it.selection }
            ]
        }.flatLeft{gameRepository.byWeek(week)}
        .map {Pair<List<Game>, Map<String, Collection<UUID>>> pair ->
            List<UUID> selectedIds = pair.right.selectedIds
            List<UUID> watchedIds = pair.right.watchedIds
            pair.left.collect {
                UserGame.fromGame(it)
                        .withFavoriteIsSelected(selectedIds.contains(it.favoriteId))
                        .withFavoriteIsWatched(watchedIds.contains(it.favoriteId))
                        .withUnderdogIsSelected(selectedIds.contains(it.underdogId))
                        .withUnderdogIsWatched(watchedIds.contains(it.underdogId))
            }
        }
        .flatLeft{userWeekRepository.get(userId, week)}
        .map{ Pair<UserWeek, List<UserGame>> pair ->
            SwamiUserWeek.fromUserWeek(pair.left)
            .withGames(pair.right)

        } as Promise<SwamiUserWeek>
    }
}
