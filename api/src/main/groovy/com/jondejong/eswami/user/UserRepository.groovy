package com.jondejong.eswami.user

import org.jooq.DSLContext
import ratpack.exec.Blocking
import ratpack.exec.Promise

import static com.jondejong.eswami.model.Tables.SWAMI_USER

import javax.inject.Inject

class UserRepository {

    private DSLContext context

    @Inject
    UserRepository(DSLContext context) {
        this.context = context
    }

    Promise<SwamiUser> updateToken(SwamiUser swamiUser) {
        Blocking.get{
            context.update(SWAMI_USER)
                .set(SWAMI_USER.TOKEN, swamiUser.token)
                .where(SWAMI_USER.ID.eq(swamiUser.id))
                .execute()
            return swamiUser
        }
    }

    Promise<SwamiUser> getByToken(UUID token) {
        Blocking.get {
            context.selectFrom(SWAMI_USER)
                    .where(SWAMI_USER.TOKEN.eq(token))
                    .fetchOneInto(SwamiUser)
        }
    }

    Promise<SwamiUser> getByEmail(String email) {
        Blocking.get {
            context.selectFrom(SWAMI_USER)
                    .where(SWAMI_USER.EMAIL.eq(email?.trim()))
                    .fetchOneInto(SwamiUser)
        }
    }

    Promise<SwamiUser> get(UUID id) {
        Blocking.get {
            context.selectFrom(SWAMI_USER)
                .where(SWAMI_USER.ID.eq(id))
                .fetchOneInto(SwamiUser)
        }
    }

    Promise<SwamiUser> saveUser(SwamiUser user) {
        Blocking.get {
            context.newRecord(SWAMI_USER, user).insert()
            return user
        }
    }

    Promise<List<SwamiUser>> list() {
        Blocking.get {
            context.selectFrom(SWAMI_USER).fetchInto(SwamiUser)
        }
    }

}
