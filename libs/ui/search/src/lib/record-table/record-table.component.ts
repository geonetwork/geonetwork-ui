import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  CatalogRecord,
  DatasetDistribution,
} from '@geonetwork-ui/common/domain/record'
import {
  FileFormat,
  getBadgeColor,
  getFileFormat,
  sortPriority,
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
    if (record.kind === 'service') {
      return []
    }
    const formatsAndPrio = record.distributions.map(
      (distribution: DatasetDistribution) => {
        return {
          format: getFileFormat(distribution),
          priority: sortPriority(distribution),
        }
      }
    )

    const sortedFormats = formatsAndPrio
      .sort((a, b) => a.priority - b.priority)
      .map((element) => element.format)

    const types = new Set(sortedFormats)
    return Array.from(types).filter((elm) => elm)
  }

  getBadgeColor(format: FileFormat): string {
    return getBadgeColor(format)
  }

  firstFormat(record: CatalogRecord): FileFormat {
    return this.getRecordFormats(record)[0]
  }

  secondToLastFormat(record: CatalogRecord): FileFormat[] {
    const formats = this.getRecordFormats(record)
    return formats.slice(formats.length - 2)
  }
}
