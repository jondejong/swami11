package com.jondejong.eswami.week

import com.jondejong.eswami.ratpack.RequestHelper
import com.jondejong.eswami.user.UserService
import ratpack.groovy.handling.GroovyChainAction

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class WeekChain extends GroovyChainAction {
    WeekService weekService
    UserService userService

    @Inject
    WeekChain(WeekService weekService, UserService userService) {
        this.weekService = weekService
        this.userService = userService
    }

    @Override
    void execute() throws Exception {

        get('current') {
            userService.validateUser(RequestHelper.getUserToken(request)).then {
                weekService.current().then {
                    render json(it)
                }
            }
        }

        path {
            byMethod {
                get {
                    userService.validateUser(RequestHelper.getUserToken(request)).then {
                        weekService.list().then {
                            render json(it)
                        }
                    }
                }
            }
        }
    }
}
