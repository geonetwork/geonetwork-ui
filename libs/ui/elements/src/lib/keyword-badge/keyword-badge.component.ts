import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matWarningAmberOutline } from '@ng-icons/material-icons/outline'
import tippy from 'tippy.js'

marker('domain.record.keywordType.theme')
marker('domain.record.keywordType.place')
marker('domain.record.keywordType.temporal')
marker('domain.record.keywordType.other')

@Component({
  selector: 'gn-ui-keyword-badge',
  templateUrl: './keyword-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BadgeComponent, NgIconComponent, TranslatePipe],
  providers: [
    provideIcons({
      matWarningAmberOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class KeywordBadgeComponent implements AfterViewInit {
  private translateService = inject(TranslateService)

  @Input() keyword: Keyword
  @Input() editable = false // if false, keyword is only clickable
  @Output() keywordClick = new EventEmitter<Keyword>()
  @Output() keywordRemove = new EventEmitter<Keyword>()
  @ViewChild(BadgeComponent, { read: ElementRef }) badgeComponent: ElementRef

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

  ngAfterViewInit() {
    const content = this.segments
      .map(
        (segment, i, arr) =>
          `<span ${i === arr.length - 1 ? 'class="font-bold"' : ''}>${segment}</span>`
      )
      .join(' &gt; ')
    tippy(this.badgeComponent.nativeElement, {
      appendTo: () => document.body,
      content,
      allowHTML: true,
    })
  }
}
