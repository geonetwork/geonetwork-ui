import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('domain.record.keywordType.theme')
marker('domain.record.keywordType.place')
marker('domain.record.keywordType.temporal')
marker('domain.record.keywordType.other')

@Component({
  selector: 'gn-ui-keyword-tooltip',
  templateUrl: './keyword-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class KeywordTooltipComponent {
  private translateService = inject(TranslateService)

  @Input() keyword: Keyword

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
}
