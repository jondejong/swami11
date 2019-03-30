package com.jondejong.eswami.userweek

import com.jondejong.eswami.command.UpdateSelectionsCommand
import com.jondejong.eswami.model.tables.pojos.UserWeekSelection
import com.jondejong.eswami.ratpack.RequestHelper
import com.jondejong.eswami.user.User
import com.jondejong.eswami.user.UserService
import ratpack.groovy.handling.GroovyChainAction

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class UserWeekChain extends GroovyChainAction {

    UserWeekService userWeekService
    UserService userService

    @Inject
    UserWeekChain(UserWeekService userWeekService, UserService userService) {
        this.userWeekService = userWeekService
        this.userService = userService
    }

    @Override
    void execute() throws Exception {

        path('selected') {
            byMethod {
                post {
                    parse(UpdateSelectionsCommand).then { UpdateSelectionsCommand command ->
                        userService.validateUser(RequestHelper.getUserToken(request)).then { User user ->
                            userWeekService.addSelection(user.id, command.selection)
                                    .then { render json(it) }
                        }
                    }
                }
                delete {
                    parse(UpdateSelectionsCommand).then { UpdateSelectionsCommand command ->
                        userService.validateUser(RequestHelper.getUserToken(request)).then { User user ->
                            userWeekService.removeSelection(user.id, command.selection).then {
                                render json([message: 'selection removed'])
                            }
                        }
                    }
                }
            }
        }

        path('watched') {
            byMethod {
                post {
                    parse(UpdateSelectionsCommand).then { UpdateSelectionsCommand command ->
                        userService.validateUser(RequestHelper.getUserToken(request)).then { User user ->
                            userWeekService.addWatch(user.id, command.selection)
                                    .then { render json(it) }
                        }
                    }
                }
                delete {
                    parse(UpdateSelectionsCommand).then { UpdateSelectionsCommand command ->
                        userService.validateUser(RequestHelper.getUserToken(request)).then { User user ->
                            userWeekService.removeWatch(user.id, command.selection).then {
                                render json([message: 'watch removed'])
                            }
                        }
                    }
                }
            }
        }

        path(':week') {
            byMethod {
                get {
                    userService.validateUser(RequestHelper.getUserToken(request)).then { User user ->
                        Integer week = Integer.parseInt(pathTokens['week'])
                        userWeekService.byUserAndWeek(user.id, week).then {
                            render json(it)
                        }
                    }
                }

            }
        }
    }
}
