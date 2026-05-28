import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core'
import {
  CatalogRecord,
  Individual,
  Keyword,
  Role,
  RoleLabels,
} from '@geonetwork-ui/common/domain/model/record'
import { DateService, getTemporalRangeUnion } from '@geonetwork-ui/util/shared'
import { MarkdownParserComponent } from '../markdown-parser/markdown-parser.component'
import {
  ExpandablePanelComponent,
  MaxLinesComponent,
} from '@geonetwork-ui/ui/layout'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  BadgeComponent,
  ButtonComponent,
  CopyTextButtonComponent,
} from '@geonetwork-ui/ui/inputs'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { matMailOutline } from '@ng-icons/material-icons/outline'
import { GnUiLinkifyDirective } from './linkify.directive'
import { GnUiHumanizeDateDirective } from '@geonetwork-ui/util/shared'

import { SpatialExtentComponent } from '@geonetwork-ui/ui/map'
import { ContactPillComponent } from '../contact-pill/contact-pill.component'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateDirective,
    TranslatePipe,
    MarkdownParserComponent,
    ExpandablePanelComponent,
    ButtonComponent,
    BadgeComponent,
    ContentGhostComponent,
    MaxLinesComponent,
    CopyTextButtonComponent,
    NgIcon,
    GnUiLinkifyDirective,
    GnUiHumanizeDateDirective,
    SpatialExtentComponent,
    ContactPillComponent,
  ],
  viewProviders: [
    provideIcons({
      matOpenInNew,
      matMailOutline,
    }),
  ],
})
export class MetadataInfoComponent {
  private dateService = inject(DateService)

  @Input() metadata: Partial<CatalogRecord>
  @Input() incomplete: boolean
  @Output() keyword = new EventEmitter<Keyword>()
  updatedTimes: number

  get hasUsage() {
    return (
      this.metadata.extras?.isOpenData === true ||
      (this.metadata.legalConstraints?.length > 0 &&
        this.legalConstraints.length > 0) ||
      (this.metadata.otherConstraints?.length > 0 &&
        this.otherConstraints.length > 0) ||
      (this.metadata.licenses?.length > 0 && this.licenses.length > 0)
    )
  }

  get legalConstraints() {
    let array = []
    if (this.metadata.legalConstraints?.length) {
      const licensesTexts = this.metadata.licenses.map(
        (license) => license.text
      )
      array = array.concat(
        this.metadata.legalConstraints
          .filter((c) => c.text && !licensesTexts.includes(c.text))
          .map((c) => c.text)
      )
    }
    return array
  }

  get otherConstraints() {
    let array = []
    if (this.metadata.otherConstraints?.length) {
      array = array.concat(
        this.metadata.otherConstraints.filter((c) => c.text).map((c) => c.text)
      )
    }
    return array
  }

  get licenses(): { text: string; url: string }[] {
    let array = []
    if (this.metadata.licenses?.length) {
      array = array.concat(
        this.metadata.licenses
          .filter((c) => c.text)
          .map((c) => ({ text: c.text, url: c.url }))
      )
    }
    return array
  }

  get updateFrequency(): string {
    if (this.metadata.updateFrequency instanceof Object) {
      this.updatedTimes = this.metadata.updateFrequency.updatedTimes
      return `domain.record.updateFrequency.${this.metadata.updateFrequency.per}`
    } else if (typeof this.metadata.updateFrequency === 'string') {
      return `domain.record.updateFrequency.${this.metadata.updateFrequency}`
    } else {
      return undefined
    }
  }

  get temporalExtent(): { start: string; end: string } {
    const temporalExtents =
      this.metadata.kind === 'dataset' ? this.metadata.temporalExtents : []
    return getTemporalRangeUnion(temporalExtents, this.dateService)
  }

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }

  get contactGroups(): {
    role: Role
    roleLabel: string
    contacts: Individual[]
  }[] {
    const groups: { role: Role; roleLabel: string; contacts: Individual[] }[] =
      []
    const indexByRole = new Map<Role, number>()
    for (const contact of this.metadata.contactsForResource ?? []) {
      if (indexByRole.has(contact.role)) {
        groups[indexByRole.get(contact.role)].contacts.push(contact)
      } else {
        indexByRole.set(contact.role, groups.length)
        groups.push({
          role: contact.role,
          roleLabel: RoleLabels.get(contact.role),
          contacts: [contact],
        })
      }
    }
    return groups
  }

  onKeywordClick(keyword: Keyword) {
    this.keyword.emit(keyword)
  }
}
