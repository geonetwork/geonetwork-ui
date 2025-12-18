import { inject, Injectable } from '@angular/core'
import { Observable, switchMap } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'
import { EditorConfig } from '../models/index.js'
import { evaluate } from '../expressions.js'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface.js'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private recordsRepository = inject(RecordsRepositoryInterface)

  // returns the record as it was when saved, alongside its source
  saveRecord(
    record: CatalogRecord,
    recordSource: string,
    fieldsConfig: EditorConfig
  ): Observable<[CatalogRecord, string]> {
    const savedRecord = { ...record }

    const fields = fieldsConfig.pages.flatMap((page) =>
      page.sections.flatMap((section) => section.fields)
    )

    // run onSave processes
    for (const field of fields) {
      if (field.onSaveProcess && field.model) {
        const evaluator = evaluate(field.onSaveProcess)
        savedRecord[field.model] = evaluator({
          model: field.model,
          value: record[field.model],
        })
      }
    }
    let publishToAll = true
    // if the record is new, generate a new unique identifier and pass publishToAll as false
    if (!record.uniqueIdentifier) {
      savedRecord.uniqueIdentifier = null
      publishToAll = false
    }

    return this.recordsRepository
      .saveRecord(savedRecord, recordSource, publishToAll)
      .pipe(
        switchMap((uniqueIdentifier) =>
          this.recordsRepository.openRecordForEdition(uniqueIdentifier)
        ),
        tap(() => {
          // if saving was successful, the original draft can be discarded
          this.recordsRepository.clearRecordDraft(record.uniqueIdentifier)
        }),
        map(([record, recordSource]) => [record, recordSource])
      )
  }

  // emits and completes once saving is done
  // note: onSave processes are not run for drafts
  saveRecordAsDraft(
    record: CatalogRecord,
    recordSource: string
  ): Observable<void> {
    record.recordUpdated = new Date()
    return this.recordsRepository
      .saveRecordAsDraft(record, recordSource)
      .pipe(map(() => undefined))
  }

  undoRecordDraft(
    record: CatalogRecord
  ): Observable<[CatalogRecord, string, boolean]> {
    this.recordsRepository.clearRecordDraft(record.uniqueIdentifier)
    return this.recordsRepository.openRecordForEdition(record.uniqueIdentifier)
  }

  hasRecordChangedSinceDraft(
    localRecord: CatalogRecord
  ): Observable<{ user: string; date: Date }> {
    return this.recordsRepository.hasRecordChangedSinceDraft(localRecord)
  }
}
