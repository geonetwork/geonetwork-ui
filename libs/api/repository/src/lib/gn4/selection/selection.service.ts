import { Injectable } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { SelectionsApiService } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, Observable, map, tap } from 'rxjs'

const BUCKET_ID = 'gnui'

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  selectedRecordsIdentifiers$: BehaviorSubject<string[]> = new BehaviorSubject(
    []
  )

  constructor(private selectionsApi: SelectionsApiService) {
    this.selectionsApi.get(BUCKET_ID).subscribe((selectedIds) => {
      this.addIdsToSelected(Array.from(selectedIds))
    })
  }

  private addIdsToSelected(ids: string[]) {
    const currentIds = this.selectedRecordsIdentifiers$.value
    const uniqueSet = new Set([...currentIds, ...ids])
    this.selectedRecordsIdentifiers$.next([...uniqueSet])
  }

  private removeIdsFromSelected(ids: string[]) {}

  selectRecords(records: CatalogRecord[]): Observable<void> {
    const newIds = []
    records.map((record) => {
      newIds.push(record.uniqueIdentifier)
    })
    const apiResponse = this.selectionsApi.add(BUCKET_ID, newIds)
    return apiResponse.pipe(
      tap(() => {
        this.addIdsToSelected(newIds)
      }),
      map(() => undefined)
    )
  }

  deselectRecord(records: CatalogRecord[]) {}

  clearSelection() {}
}
