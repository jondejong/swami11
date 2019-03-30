package com.jondejong.eswami.user

import com.jondejong.eswami.command.CreateUserCommand
import com.jondejong.eswami.command.LoginCommand
import com.jondejong.eswami.command.LoginResponse
import ratpack.exec.Promise

import javax.inject.Inject
import java.security.MessageDigest

class UserService {

    UserRepository userRepository

    @Inject
    UserService(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    Promise<User> getUserByToken(String token) {
        UUID tokenId
        try {
            tokenId = UUID.fromString(token)
        } catch(e) {
            throw new IllegalAccessException()
        }
        userRepository.getByToken(tokenId).blockingMap {
            if (!it) {
                throw new IllegalAccessException()
            }
            User.from(it)
        } as Promise<User>
    }

    Promise<LoginResponse> login(LoginCommand loginCommand) {
        userRepository.getByEmail(loginCommand.email).flatMap { SwamiUser swamiUser ->
            if (!swamiUser) {
                throw new IllegalAccessException()
            }

            if (swamiUser?.password == generatePassword(swamiUser.salt, loginCommand.password)) {
                swamiUser.token = UUID.randomUUID()
                userRepository.updateToken(swamiUser).blockingMap {
                    return LoginResponse.from(swamiUser.token)
                }
            } else {
                throw new IllegalAccessException()
            }
        } as Promise<LoginResponse>
    }

    Promise<User> validateUser(String token) {
        getUserByToken(token).blockingMap{User user ->
            if(!user) {
                throw new IllegalAccessException()
            }
            user
        } as Promise<User>
    }

    Promise<User> createNewUser(CreateUserCommand command) {
        UUID salt = UUID.randomUUID()
        userRepository.saveUser(
                SwamiUser.from(command)
                        .withSalt(salt)
                        .withPassword(generatePassword(salt.toString(), command.password))
        ).blockingMap { User.from(it) } as Promise<User>
    }

    Promise<List<User>> list() {
        userRepository.list().blockingMap { List<SwamiUser> swamiUsers ->
            swamiUsers.collect { SwamiUser swamiUser ->
                User.from(swamiUser)
            }
        } as Promise<List<User>>
    }

    String generatePassword(String salt, String password) {
        sha256Hash("${salt}${password}")
    }

    String sha256Hash(text) {
        MessageDigest.getInstance("SHA-256")
                .digest(text.getBytes("UTF-8")).encodeBase64().toString()
    }
}
