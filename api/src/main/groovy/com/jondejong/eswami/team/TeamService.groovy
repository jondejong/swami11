package com.jondejong.eswami.team

import ratpack.exec.Promise

import javax.inject.Inject

class TeamService {
    TeamRepository teamRepository

    @Inject
    TeamService(TeamRepository thingRepository) {
        this.teamRepository = thingRepository
    }

    Promise<List<Team>> list() {
        teamRepository.list()
    }
}
