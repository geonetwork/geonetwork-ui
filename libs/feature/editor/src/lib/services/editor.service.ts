import { Injectable } from '@angular/core'
import { Observable, switchMap } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { EditorFieldsConfig } from '../models/fields.model'
import { evaluate } from '../expressions'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor(private recordsRepository: RecordsRepositoryInterface) {}

  // returns the record as it was when saved, alongside its source
  saveRecord(
    record: CatalogRecord,
    fieldsConfig: EditorFieldsConfig,
    generateNewUniqueIdentifier = false
  ): Observable<[CatalogRecord, string]> {
    const savedRecord = { ...record }

    // run onSave processes
    for (const field of fieldsConfig) {
      if (field.onSaveProcess && field.model) {
        const evaluator = evaluate(field.onSaveProcess)
        savedRecord[field.model] = evaluator({
          config: field,
          value: record[field.model],
        })
      }
    }

    // if we want a new unique identifier, clear the existing one
    if (generateNewUniqueIdentifier) {
      savedRecord.uniqueIdentifier = null
    }

    return this.recordsRepository.saveRecord(savedRecord).pipe(
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
  saveRecordAsDraft(record: CatalogRecord): Observable<void> {
    return this.recordsRepository
      .saveRecordAsDraft(record)
      .pipe(map(() => undefined))
  }
}
