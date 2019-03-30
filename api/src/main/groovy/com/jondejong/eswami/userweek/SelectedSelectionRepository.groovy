package com.jondejong.eswami.userweek

import com.jondejong.eswami.model.tables.pojos.UserWeekSelection
import org.jooq.DSLContext
import ratpack.exec.Blocking
import ratpack.exec.Promise

import javax.inject.Inject

import static com.jondejong.eswami.model.Tables.*

class SelectedSelectionRepository {
    private DSLContext context

    @Inject
    SelectedSelectionRepository(DSLContext context) {
        this.context = context
    }

    Promise delete(UserWeekSelection selection) {
        Blocking.get {
            context.deleteFrom(USER_WEEK_SELECTION)
            .where(USER_WEEK_SELECTION.SELECTION.eq(selection.selection))
            .and(USER_WEEK_SELECTION.USER_WEEK.eq(selection.userWeek))
            .execute()
        }
    }

    Promise<UserWeekSelection> save(UserWeekSelection selection) {
        Blocking.get {
            context.newRecord(USER_WEEK_SELECTION, selection).insert()
            return selection
        }
    }

    Promise<List<UserWeekSelection>> byUserAndWeek(UUID userId, Integer week) {
        Blocking.get {
            context.select(
                    USER_WEEK_SELECTION.SELECTION,
                    USER_WEEK_SELECTION.USER_WEEK
            )
                    .from(USER_WEEK_SELECTION)
                    .join(USER_WEEK).on(USER_WEEK.SWAMI_USER.eq(userId))
                    .and(USER_WEEK.WEEK.eq(week))
                    .fetchInto(UserWeekSelection)
        }
    }
}
