import { Injectable } from '@angular/core'
import { forkJoin, Observable, of, switchMap } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { EditorConfig } from '../models/'
import { evaluate } from '../expressions'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor(
    private recordsRepository: RecordsRepositoryInterface,
    private router: Router
  ) {}

  // returns the record as it was when saved, alongside its source
  saveRecord(
    record: CatalogRecord,
    recordSource: string,
    fieldsConfig: EditorConfig,
    generateNewUniqueIdentifier = false
  ): Observable<[CatalogRecord, string, boolean]> {
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
      generateNewUniqueIdentifier = true
      publishToAll = false
    }

    // if we want a new unique identifier, clear the existing one
    if (generateNewUniqueIdentifier) {
      savedRecord.uniqueIdentifier = null
    }

    const navigation = this.router.getCurrentNavigation()
    const published = navigation?.extras.state?.published

    return this.recordsRepository
      .saveRecord(savedRecord, recordSource, publishToAll)
      .pipe(
        switchMap(({ uuid, isDraft }) =>
          forkJoin([
            this.recordsRepository.openRecordForEdition(
              uuid,
              published === false
            ),
            of(isDraft),
          ])
        ),

        tap(() => {
          // if saving was successful, the original draft can be discarded
          this.recordsRepository.clearRecordDraft(record.uniqueIdentifier)
        }),
        map(([record, isDraft]) => [record[0], record[1], isDraft])
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
  ): Observable<[CatalogRecord, string, boolean, boolean]> {
    this.recordsRepository.clearRecordDraft(record.uniqueIdentifier)
    return this.recordsRepository.openRecordForEdition(record.uniqueIdentifier)
  }

  hasRecordChangedSinceDraft(
    localRecord: CatalogRecord
  ): Observable<{ user: string; date: Date }> {
    return this.recordsRepository.hasRecordChangedSinceDraft(localRecord)
  }
}
