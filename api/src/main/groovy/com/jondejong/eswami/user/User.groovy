package com.jondejong.eswami.user

import com.jondejong.eswami.command.CreateUserCommand

class User {
    User() {}

    static User from(CreateUserCommand command) {
        new User(
                id: UUID.randomUUID(),
                firstName: command.firstName,
                lastName: command.lastName,
                email: command.email
        )
    }

    static User from(SwamiUser swamiUser) {
        new User(
            id: swamiUser.id,
            firstName: swamiUser.firstName,
            lastName: swamiUser.lastName,
            email: swamiUser.email
        )
    }

    UUID id
    String firstName
    String lastName
    String email
}
