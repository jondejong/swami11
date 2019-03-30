package com.jondejong.eswami.userweek

import com.jondejong.eswami.game.Game

class UserGame {
    UUID id
    Float spread
    Integer week
    String day

    String favoriteName
    String favoriteNickName
    UUID favoriteId
    Boolean favoriteIsHome
    Boolean favoriteIsWatched
    Boolean favoriteIsSelected

    String underdogName
    String underdogNickName
    UUID underdogId
    Boolean underdogIsHome
    Boolean underdogIsWatched
    Boolean underdogIsSelected

    static UserGame fromGame(Game game) {
        new UserGame(
                id: game.id,
                spread: game.spread,
                week: game.week,
                day: game.day,
                favoriteName: game.favoriteName,
                favoriteNickName: game.favoriteNickName,
                favoriteId: game.favoriteId,
                favoriteIsHome: game.favoriteIsHome,
                underdogName: game.underdogName,
                underdogNickName: game.underdogNickName,
                underdogId: game.underdogId,
                underdogIsHome: game.underdogIsHome,

                favoriteIsWatched: false,
                favoriteIsSelected: false,
                underdogIsWatched: false,
                underdogIsSelected: false
        )
    }

    UserGame withFavoriteIsWatched(Boolean value) {
        this.favoriteIsWatched = value
        return this
    }

    UserGame withFavoriteIsSelected(Boolean value) {
        this.favoriteIsSelected = value
        return this
    }

    UserGame withUnderdogIsWatched(Boolean value) {
        this.underdogIsWatched = value
        return this
    }

    UserGame withUnderdogIsSelected(Boolean value) {
        this.underdogIsSelected = value
        return this
    }


}
