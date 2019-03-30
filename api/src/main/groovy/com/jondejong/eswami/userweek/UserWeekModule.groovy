package com.jondejong.eswami.userweek

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class UserWeekModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(WatchedSelectionRepository).in(Scopes.SINGLETON)
        bind(SelectedSelectionRepository).in(Scopes.SINGLETON)
        bind(UserWeekRepository).in(Scopes.SINGLETON)
        bind(UserWeekService).in(Scopes.SINGLETON)
        bind(UserWeekChain).in(Scopes.SINGLETON)
    }
}
