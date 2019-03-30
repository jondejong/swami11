package com.jondejong.eswami.team

import groovy.util.logging.Slf4j
import ratpack.exec.Blocking
import ratpack.exec.Promise

import static com.jondejong.eswami.model.Tables.CONFERENCE
import static com.jondejong.eswami.model.Tables.TEAM

import org.jooq.DSLContext

import javax.inject.Inject

@Slf4j
class TeamRepository {

    private DSLContext context

    @Inject
    TeamRepository(DSLContext context) {
        this.context = context
    }

    Promise<List<Team>> list() {
        Blocking.get {
            context.select(TEAM.ID, TEAM.NAME, TEAM.NICK_NAME, CONFERENCE.NAME.as('conference'))
                    .from(TEAM)
                    .join(CONFERENCE).on(CONFERENCE.ID.eq(TEAM.CONFERENCE))
                    .fetchInto(Team)
        }

    }
}
