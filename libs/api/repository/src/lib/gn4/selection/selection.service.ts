import { Injectable } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SelectionsApiService } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, firstValueFrom } from 'rxjs'

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

  private removeIdsFromSelected(ids: string[]) {
    const filtered = this.selectedRecordsIdentifiers$.value.filter(
      (value) => !ids.includes(value)
    )
    this.selectedRecordsIdentifiers$.next(filtered)
  }

  selectRecords(records: CatalogRecord[]) {
    const newIds = records.map((record) => record.uniqueIdentifier)
    this.selectionsApi.add(BUCKET_ID, newIds).subscribe(() => {
      this.addIdsToSelected(newIds)
    })
  }

  deselectRecords(records: CatalogRecord[]) {
    const idsToBeRemoved = records.map((record) => record.uniqueIdentifier)
    this.selectionsApi.clear(BUCKET_ID, idsToBeRemoved).subscribe(() => {
      this.removeIdsFromSelected(idsToBeRemoved)
    })
  }

  async clearSelection() {
    const response = await firstValueFrom(this.selectionsApi.get(BUCKET_ID))
    const currentSelection = Array.from(response)
    this.selectionsApi.clear(BUCKET_ID, currentSelection).subscribe(() => {
      this.removeIdsFromSelected(currentSelection)
    })
  }
}
