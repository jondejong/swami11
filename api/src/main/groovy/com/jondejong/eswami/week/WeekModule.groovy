package com.jondejong.eswami.week

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class WeekModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(WeekRepository).in(Scopes.SINGLETON)
        bind(WeekService).in(Scopes.SINGLETON)
        bind(WeekChain).in(Scopes.SINGLETON)
    }
}
