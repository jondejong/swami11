package com.jondejong.eswami.user

import com.jondejong.eswami.command.CreateUserCommand

class SwamiUser {

    static SwamiUser from(CreateUserCommand command) {
        new SwamiUser(
                id: UUID.randomUUID(),
                firstName: command.firstName,
                lastName: command.lastName,
                email: command.email
        )
    }

    static SwamiUser from(User user) {
        new SwamiUser(
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        )
    }

    SwamiUser withSalt(UUID salt) {
        this.salt = salt
        return this
    }

    SwamiUser withPassword(String password) {
        this.password = password
        return this
    }

    UUID id
    String firstName
    String lastName
    String email
    String password
    String salt
    UUID token
}
