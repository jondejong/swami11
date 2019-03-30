package com.jondejong.eswami.command

class LoginResponse {
    String token

    private LoginResponse(String token) {
        this.token = token
    }

    static from(UUID token) {
        new LoginResponse(token.toString())
    }
}
