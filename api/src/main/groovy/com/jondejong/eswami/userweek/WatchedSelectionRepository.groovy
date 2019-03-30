package com.jondejong.eswami.userweek

import com.jondejong.eswami.model.tables.pojos.UserWeekWatched
import org.jooq.DSLContext
import ratpack.exec.Blocking
import ratpack.exec.Promise
import static com.jondejong.eswami.model.Tables.*

import javax.inject.Inject

class WatchedSelectionRepository {

    private DSLContext context

    @Inject
    WatchedSelectionRepository(DSLContext context) {
        this.context = context
    }

    Promise delete(UserWeekWatched selection) {
        Blocking.get {
            context.deleteFrom(USER_WEEK_WATCHED)
                    .where(USER_WEEK_WATCHED.SELECTION.eq(selection.selection))
                    .and(USER_WEEK_WATCHED.USER_WEEK.eq(selection.userWeek))
                    .execute()
        }
    }

    Promise<UserWeekWatched> save(UserWeekWatched selection) {
        Blocking.get {
            context.newRecord(USER_WEEK_WATCHED, selection).insert()
            return selection
        }
    }

    Promise<List<UserWeekWatched>> byUserAndWeek(UUID userId, Integer week) {
        Blocking.get {
            context.select(
                    USER_WEEK_WATCHED.SELECTION,
                    USER_WEEK_WATCHED.USER_WEEK
            )
            .from(USER_WEEK_WATCHED)
            .join(USER_WEEK).on(USER_WEEK.SWAMI_USER.eq(userId))
            .and(USER_WEEK.WEEK.eq(week))
            .fetchInto(UserWeekWatched)
        }
    }
}
