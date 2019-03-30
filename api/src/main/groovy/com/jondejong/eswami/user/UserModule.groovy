package com.jondejong.eswami.user

import com.google.inject.AbstractModule
import com.google.inject.Scopes

class UserModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(UserService).in(Scopes.SINGLETON)
        bind(UserRepository).in(Scopes.SINGLETON)
        bind(UserChain).in(Scopes.SINGLETON)
        bind(LoginChain).in(Scopes.SINGLETON)
    }
}
