package com.jondejong.eswami.database

import com.google.inject.Provides

import org.jooq.Configuration
import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.impl.DSL

import org.jooq.impl.DefaultConfiguration
import ratpack.hikari.HikariModule
import ratpack.hikari.HikariService
import ratpack.jdbctx.Transaction

import javax.inject.Singleton
import javax.sql.DataSource

class JooqModule extends HikariModule {

    @Provides
    @Singleton
    DSLContext dslContext(DataSource dataSource) {
        Configuration configuration = new DefaultConfiguration()
                .set(dataSource)
                .set(SQLDialect.POSTGRES)

        return DSL.using(configuration);
    }

    @Override
    protected DataSource getDataSource(HikariService service) {
        return Transaction.dataSource(super.getDataSource(service))
    }
}