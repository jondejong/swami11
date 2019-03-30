package com.jondejong.eswami.game

import com.jondejong.eswami.command.CreateGameCommand
import com.jondejong.eswami.ratpack.RequestHelper
import com.jondejong.eswami.user.UserService
import ratpack.groovy.handling.GroovyChainAction

import javax.inject.Inject

import static ratpack.jackson.Jackson.json

class GameChain extends GroovyChainAction {
    GameService gameService
    UserService userService

    @Inject
    GameChain(GameService gameService, UserService userService) {
        this.gameService = gameService
        this.userService = userService
    }

    @Override
    void execute() throws Exception {
        path(':week') {
            byMethod {
                get {
                    userService.validateUser(RequestHelper.getUserToken(request)).then {
                        Integer week = Integer.parseInt(pathTokens['week'])
                        gameService.byWeek(week).then {
                            render json(it)
                        }
                    }
                }
            }
        }

        path {
            byMethod {
                get {
                    userService.validateUser(RequestHelper.getUserToken(request)).then {
                        gameService.list().then {
                            render json(it)
                        }
                    }
                }
                post {
                    parse(CreateGameCommand).then {CreateGameCommand command ->
                        userService.validateUser(RequestHelper.getUserToken(request)).then {
                            gameService.createGame(command).then {
                                render json(it)
                            }
                        }
                    }
                }
            }
        }
    }
}
