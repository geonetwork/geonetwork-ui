import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import {
  FileFormat,
  getBadgeColor,
  getFileFormat,
  getFormatPriority,
} from '@geonetwork-ui/util/shared'

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
    if (record.kind === 'service' || !('distributions' in record)) {
      return []
    }
    const formats = Array.from(
      new Set(
        record.distributions.map((distribution) => getFileFormat(distribution))
      )
    ).filter((format) => !!format)
    formats.sort((a, b) => getFormatPriority(b) - getFormatPriority(a))
    return formats
  }

  getBadgeColor(format: FileFormat): string {
    return getBadgeColor(format)
  }
}
