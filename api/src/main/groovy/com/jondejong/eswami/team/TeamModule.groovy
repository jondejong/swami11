package com.jondejong.eswami.team

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class TeamModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(TeamService).in(Scopes.SINGLETON)
        bind(TeamRepository).in(Scopes.SINGLETON)
        bind(TeamChain).in(Scopes.SINGLETON)
    }
}
