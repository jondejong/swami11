package com.jondejong.eswami.week

import com.jondejong.eswami.model.tables.pojos.Week
import ratpack.exec.Promise

import javax.inject.Inject

class WeekService {

    WeekRepository weekRepository

    @Inject
    WeekService(WeekRepository weekRepository) {
        this.weekRepository = weekRepository
    }

    Promise<List<Week>> list() {
        weekRepository.list()
    }

    Promise<Week> current() {
        weekRepository.current()
    }
}
