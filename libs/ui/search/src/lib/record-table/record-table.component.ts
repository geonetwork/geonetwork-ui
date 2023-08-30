import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  CatalogRecord,
  DatasetDistribution,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/record'
import { FileFormat, getFileFormat } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
})
export class RecordTableComponent {
  @Input() records: CatalogRecord[] = []
  @Input() totalHits?: number
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

  getRecordFormats(record: CatalogRecord): FileFormat[] {
    if (record.kind === 'service') {
      return []
    }
    const types = new Set(
      record.distributions.map((distribution) => getFileFormat(distribution))
    )
    return Array.from(types).filter((elm) => elm)
  }
}
