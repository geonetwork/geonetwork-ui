import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'

@Component({
  selector: 'gn-ui-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
})
export class RecordTableComponent {
  @Input() records: MetadataRecord[] = RECORDS_SUMMARY_FIXTURE
  @Output() recordSelect = new EventEmitter<MetadataRecord>()

  dateToString(date: Date): string {
    return date?.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  getStatus(isPublishedToAll: boolean) {
    return isPublishedToAll === true ? 'published' : 'not published'
  }

  formatUserInfo(userInfo: string): string {
    const infos = userInfo?.split('|')
    if (infos && infos.length === 4) {
      return `${infos[2]} ${infos[1]}`
    }
    return undefined
  }
}
