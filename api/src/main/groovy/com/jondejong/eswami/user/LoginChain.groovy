package com.jondejong.eswami.user

import com.jondejong.eswami.command.LoginCommand
import ratpack.groovy.handling.GroovyChainAction

import static ratpack.jackson.Jackson.json

import javax.inject.Inject

class LoginChain extends GroovyChainAction {

    UserService userService

    @Inject
    LoginChain(UserService userService) {
        this.userService = userService
    }

    @Override
    void execute() throws Exception {
        path {
            byMethod {
                post {
                    parse(LoginCommand).then{LoginCommand command ->
                        userService.login(command).then {
                            render json(it)
                        }
                    }
                }
            }
        }
    }
}
