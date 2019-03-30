package com.jondejong.eswami.week

import static com.jondejong.eswami.model.Tables.WEEK
import com.jondejong.eswami.model.tables.pojos.Week
import org.jooq.DSLContext
import ratpack.exec.Blocking
import ratpack.exec.Promise

import javax.inject.Inject

class WeekRepository {

    private DSLContext context

    @Inject
    WeekRepository(DSLContext context) {
        this.context = context
    }

    Promise<List<Week>> list() {
        Blocking.get {
            context.selectFrom(WEEK).fetchInto(Week)
        }
    }

    Promise<Week> current() {
        Blocking.get {
            context.selectFrom(WEEK)
                    .where(WEEK.COMPLETED.eq(false))
                    .orderBy(WEEK.NUMBER)
                    .limit(1)
                    .fetchOneInto(Week)
        }
    }
}
