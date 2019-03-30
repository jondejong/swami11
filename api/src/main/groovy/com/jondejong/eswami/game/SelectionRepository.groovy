package com.jondejong.eswami.game

import com.jondejong.eswami.model.tables.records.SelectionRecord
import ratpack.exec.Blocking
import ratpack.exec.Promise

import static com.jondejong.eswami.model.Tables.SELECTION

import org.jooq.DSLContext

import javax.inject.Inject

class SelectionRepository {

    private DSLContext context

    @Inject
    SelectionRepository(DSLContext context) {
        this.context = context
    }

    Promise<Collection<SwamiSelection>> saveSelections(Collection<SwamiSelection> selections) {
        Collection<SelectionRecord> records = selections.collect {
            context.newRecord(SELECTION, it)
        }
        Blocking.get {
            context.batchInsert(records).execute()
            selections
        }
    }

    Promise<SwamiSelection> saveSelection(SwamiSelection selection) {
        Blocking.get {
            context.newRecord(SELECTION, selection).insert()
            return selection
        }
    }

    Promise<SwamiSelection> get(UUID id) {
        Blocking.get {
            context.selectFrom(SELECTION)
                .where(SELECTION.ID.eq(id))
                .fetchOneInto(SwamiSelection)
        }
    }

}
