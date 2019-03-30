package com.jondejong.eswami.userweek

import com.jondejong.eswami.model.tables.pojos.UserWeek
import org.jooq.DSLContext
import ratpack.exec.Blocking
import ratpack.exec.Promise

import javax.inject.Inject

import static com.jondejong.eswami.model.Tables.*

class UserWeekRepository {

    private DSLContext context

    @Inject
    UserWeekRepository(DSLContext context) {
        this.context = context
    }

    Promise<UserWeek> get(UUID user, Integer week) {
        Blocking.get {
            context.selectFrom(USER_WEEK)
            .where(USER_WEEK.SWAMI_USER.eq(user))
            .and(USER_WEEK.WEEK.eq(week))
            .fetchOneInto(UserWeek)
        }
    }

    /**
     * Given a selection, this will join on that selection's week
     */
    Promise<UserWeek> get(UUID user, UUID selection) {
        Blocking.get {
            context.select(
                    USER_WEEK.ID,
                    USER_WEEK.SWAMI_USER,
                    USER_WEEK.WEEK,
                    USER_WEEK.NCAA_GAMES,
                    USER_WEEK.NFL_GAMES,
                    USER_WEEK.SUBMITTED
            )
                .from(USER_WEEK)
                .join(GAME).on(GAME.WEEK.eq(USER_WEEK.WEEK))
                .join(SELECTION).on(SELECTION.GAME.eq((GAME.ID)))
                .where(SELECTION.ID.eq(selection))
                    .fetchOneInto(UserWeek)
        }
    }
}
