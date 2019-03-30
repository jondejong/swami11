package com.jondejong.eswami.userweek

import com.jondejong.eswami.model.tables.pojos.UserWeek

class SwamiUserWeek {

    Integer ncaaGames
    Integer nflGames
    Boolean submitted
    Integer week
    List<UserGame> games

    static SwamiUserWeek fromUserWeek(UserWeek userWeek) {
        new SwamiUserWeek(
                ncaaGames: userWeek.ncaaGames,
                nflGames: userWeek.nflGames,
                submitted: userWeek.submitted,
                week: userWeek.week
        )
    }

    SwamiUserWeek withGames(List<UserGame> games) {
        this.games = games
        return this
    }

}
