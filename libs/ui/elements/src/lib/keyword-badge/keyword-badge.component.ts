import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { PopoverComponent } from '@geonetwork-ui/ui/widgets'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matWarningAmberOutline } from '@ng-icons/material-icons/outline'

marker('domain.record.keywordType.theme')
marker('domain.record.keywordType.place')
marker('domain.record.keywordType.temporal')
marker('domain.record.keywordType.other')

@Component({
  selector: 'gn-ui-keyword-badge',
  templateUrl: './keyword-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BadgeComponent, PopoverComponent, NgIconComponent, TranslatePipe],
  providers: [
    provideIcons({
      matWarningAmberOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class KeywordBadgeComponent {
  private translateService = inject(TranslateService)

  @Input() keyword: Keyword
  /** edit mode shows a removable badge (editor); otherwise a clickable badge (datahub) */
  @Input() editMode = false
  @Output() keywordClick = new EventEmitter<Keyword>()
  @Output() remove = new EventEmitter<Keyword>()

  get segments(): string[] {
    if (this.keyword.hierarchyPath?.length) {
      return this.keyword.hierarchyPath
    }
    if (this.keyword.thesaurus?.name) {
      return [this.keyword.thesaurus.name, this.keyword.label]
    }
    return [
      this.translateService.instant(
        `domain.record.keywordType.${this.keyword.type}`
      ),
      this.keyword.label,
    ]
  }

  get isPlaceWithoutExtent(): boolean {
    return this.keyword.type === 'place' && !this.keyword.bbox
  }
}
