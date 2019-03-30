package com.jondejong.eswami.team

import com.jondejong.eswami.ratpack.RequestHelper
import com.jondejong.eswami.user.UserService
import ratpack.groovy.handling.GroovyChainAction

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class TeamChain extends GroovyChainAction {
    TeamService teamService
    UserService userService

    @Inject
    TeamChain(TeamService teamService, UserService userService) {
        this.teamService = teamService
        this.userService = userService
    }

    @Override
    void execute() throws Exception {
        path {
            byMethod {
                get {
                    userService.validateUser(RequestHelper.getUserToken(request)).then {
                        teamService.list().then {
                            render json(it)
                        }
                    }
                }
            }
        }
    }
}

