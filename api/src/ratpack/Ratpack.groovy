import com.google.common.io.Resources
import com.jondejong.eswami.database.JooqModule
import com.jondejong.eswami.database.PostgresConfig
import com.jondejong.eswami.game.GameChain
import com.jondejong.eswami.game.GameModule
import com.jondejong.eswami.handlers.ErrorHandler
import com.jondejong.eswami.team.TeamChain
import com.jondejong.eswami.team.TeamModule
import com.jondejong.eswami.user.LoginChain
import com.jondejong.eswami.user.UserChain
import com.jondejong.eswami.user.UserModule
import com.jondejong.eswami.user.UserService
import com.jondejong.eswami.userweek.UserWeekChain
import com.jondejong.eswami.userweek.UserWeekModule
import com.jondejong.eswami.week.WeekChain
import com.jondejong.eswami.week.WeekModule
import com.zaxxer.hikari.HikariConfig
import ratpack.error.ServerErrorHandler
import ratpack.exec.Blocking

import static ratpack.groovy.Groovy.ratpack

ratpack {

    serverConfig {
        yaml(Resources.asByteSource(Resources.getResource("application.yaml")))
        env()
        sysProps()
    }

    bindings {
        module TeamModule
        module UserModule
        module WeekModule
        module GameModule
        module UserWeekModule

        bindInstance(ServerErrorHandler, new ErrorHandler())

        PostgresConfig postgresConfig = serverConfig.get('/db', PostgresConfig)
        module JooqModule, { HikariConfig config ->
            config.dataSource = postgresConfig.createDataSource()
        }
    }

    handlers {
        all {
            response.headers.add 'Access-Control-Allow-Origin', '*'
            response.headers.add 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'
            response.headers.add 'Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type,X-Requested-With'
            next()
        }

        prefix('login') { insert(LoginChain) }
        prefix('teams') { insert(TeamChain) }
        prefix('users') { insert(UserChain) }
        prefix('weeks') { insert(WeekChain) }
        prefix('games') { insert(GameChain) }
        prefix('userweeks'){insert(UserWeekChain)}

    }
}
