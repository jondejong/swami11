package com.jondejong.eswami.ratpack

import ratpack.http.Request

class RequestHelper {

    static final String TOKEN_HEADER = 'X-Auth-Token'

    static String getUserToken(Request request) {
        request.headers.get(TOKEN_HEADER)
    }

}
