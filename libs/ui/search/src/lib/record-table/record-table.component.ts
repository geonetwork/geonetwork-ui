import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
})
export class RecordTableComponent {
  @Input() records: CatalogRecord[] = DATASET_RECORDS
  @Output() recordSelect = new EventEmitter<CatalogRecord>()

  dateToString(date: Date): string {
    return date?.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  getStatus(isPublishedToAll: boolean | unknown) {
    return isPublishedToAll ? 'published' : 'not published'
  }

  formatUserInfo(userInfo: string | unknown): string {
    const infos = (typeof userInfo === 'string' ? userInfo : '').split('|')
    if (infos && infos.length === 4) {
      return `${infos[2]} ${infos[1]}`
    }
    return undefined
  }
}
