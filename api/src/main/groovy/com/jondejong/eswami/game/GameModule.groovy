package com.jondejong.eswami.game

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class GameModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(GameRepository).in(Scopes.SINGLETON)
        bind(SelectionRepository).in(Scopes.SINGLETON)
        bind(GameService).in(Scopes.SINGLETON)
        bind(GameChain).in(Scopes.SINGLETON)
    }
}
