package com.jondejong.eswami.user

import com.jondejong.eswami.command.CreateUserCommand
import com.jondejong.eswami.ratpack.RequestHelper
import ratpack.groovy.handling.GroovyChainAction

import static ratpack.jackson.Jackson.json

import javax.inject.Inject

class UserChain extends GroovyChainAction {

    UserService userService

    @Inject
    UserChain(UserService userService) {
        this.userService = userService
    }

    @Override
    void execute() throws Exception {
        //TODO: Lock these down appropriately
        path {
            byMethod {
                get {
                    userService.list().then{
                        render json(it)
                    }
                }
                post {
                    parse(CreateUserCommand).then { CreateUserCommand command ->
                        userService.createNewUser(command).then { User user ->
                            render json(user)
                        }
                    }
                }
            }
        }
        path('logged_in') {
            byMethod {
                get {
                    userService.validateUser(RequestHelper.getUserToken(request)).then { User user ->
                        render json(user)
                    }
                }
            }
        }
    }
}
