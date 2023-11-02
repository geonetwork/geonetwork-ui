import { Injectable } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { SelectionsApiService } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, Observable, Subscription, map, tap } from 'rxjs'

const BUCKET_ID = 'gnui'

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  selectedRecordsIdentifiers$: BehaviorSubject<string[]> = new BehaviorSubject(
    []
  )
  subscription: Subscription

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

  private removeIdsFromSelected(ids: string[]) {
    const filtered = this.selectedRecordsIdentifiers$.value.filter(
      (value) => !ids.includes(value)
    )
    this.selectedRecordsIdentifiers$.next(filtered)
  }

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

  deselectRecords(records: CatalogRecord[]): Observable<void> {
    const idsToBeRemoved = []
    records.map((record) => {
      idsToBeRemoved.push(record.uniqueIdentifier)
    })
    const apiResponse = this.selectionsApi.clear(BUCKET_ID, idsToBeRemoved)
    return apiResponse.pipe(
      tap(() => {
        this.removeIdsFromSelected(idsToBeRemoved)
      }),
      map(() => undefined)
    )
  }

  clearSelection(): Observable<void> {
    const currentSelectedResponse = this.selectionsApi.get(BUCKET_ID)
    let currentSelection
    this.subscription = currentSelectedResponse.subscribe((value) => {
      currentSelection = [...value]
    })
    this.selectionsApi.clear(BUCKET_ID, currentSelection)
    const apiResponse = this.selectionsApi.clear(BUCKET_ID, currentSelection)

    return apiResponse.pipe(
      tap(() => {
        this.removeIdsFromSelected(currentSelection)
      }),
      map(() => undefined)
    )
  }
}
