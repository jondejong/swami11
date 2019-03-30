package com.jondejong.eswami.database

import org.postgresql.ds.PGSimpleDataSource
import ratpack.jdbctx.Transaction

import javax.sql.DataSource

class PostgresConfig {

    String user
    String password
    String serverName
    String databaseName
    Integer port

    DataSource createDataSource() {
        PGSimpleDataSource postgresDataSource = new PGSimpleDataSource()
        postgresDataSource.setUser(this.user)
        postgresDataSource.setPassword(this.password)
        postgresDataSource.setServerName(this.serverName)
        postgresDataSource.setDatabaseName(this.databaseName)
        postgresDataSource.setPortNumber(this.port)
        Transaction.dataSource(postgresDataSource)
    }

}
