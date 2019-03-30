package com.jondejong.eswami.game

import com.jondejong.eswami.model.tables.records.SelectionRecord
import com.jondejong.eswami.model.tables.records.TeamRecord
import org.jooq.DSLContext
import org.jooq.impl.TableImpl
import ratpack.exec.Blocking
import ratpack.exec.Promise

import static com.jondejong.eswami.model.Tables.GAME
import static com.jondejong.eswami.model.Tables.TEAM
import static com.jondejong.eswami.model.Tables.SELECTION

import javax.inject.Inject

class GameRepository {
    private DSLContext context

    @Inject
    GameRepository(DSLContext context) {
        this.context = context
    }

    // Use this for development debugging only
    @Deprecated
    Promise<List<Game>> list() {
        Blocking.get {
            context.selectFrom(GAME).fetchInto(Game)
        }
    }

    Promise<List<Game>> byWeek(Integer week) {
        Blocking.get {
            TableImpl<SelectionRecord> s1 = SELECTION.as('s1')
            TableImpl<SelectionRecord> s2 = SELECTION.as('s2')

            TableImpl<TeamRecord> t1 = TEAM.as('t1')
            TableImpl<TeamRecord> t2= TEAM.as('t2')

            context.select(
                    GAME.ID,
                    GAME.WEEK,
                    GAME.DAY,
                    GAME.SPREAD,
                    t1.NAME.as('favoriteName'),
                    t1.NICK_NAME.as('favoriteNickName'),
                    t2.NAME.as('underdogName'),
                    t2.NICK_NAME.as('underdogNickName'),
                    s1.ID.as('favoriteId'),
                    s2.ID.as('underdogId'),
                    s1.HOME.as('favoriteIsHome'),
                    s2.HOME.as('underdogIsHome')
            )
            .from(GAME)
            .join(s1).on(s1.GAME.eq(GAME.ID))
            .join(s2).on(s2.GAME.eq(GAME.ID))
            .join(t1).on(t1.ID.eq(s1.TEAM))
            .join(t2).on(t2.ID.eq(s2.TEAM))
            .where(GAME.WEEK.eq(week))
            .and(s1.FAVORITE.isTrue())
            .and(s2.FAVORITE.isFalse())
            .fetchInto(Game)
        }
    }

    Promise<SwamiGame> saveGame(SwamiGame game) {
        Blocking.get {
            context.newRecord(GAME, game).insert()
            return game
        }
    }


}
