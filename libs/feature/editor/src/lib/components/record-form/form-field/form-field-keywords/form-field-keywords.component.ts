import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core'
import { Keyword } from '@geonetwork-ui/common/domain/model/record/index.js'
import { GenericKeywordsComponent } from '../../../generic-keywords/generic-keywords.component.js'
import { TranslatePipe } from '@ngx-translate/core'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus/index.js'
import { EditorFacade } from '../../../../+state/editor.facade.js'
import { firstValueFrom, map } from 'rxjs'
import { SPATIAL_SCOPES } from '../../../../fields.config.js'

@Component({
  selector: 'gn-ui-form-field-keywords',
  templateUrl: './form-field-keywords.component.html',
  styleUrls: ['./form-field-keywords.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GenericKeywordsComponent, TranslatePipe],
})
export class FormFieldKeywordsComponent {
  private editorFacade = inject(EditorFacade)

  @Input() value: Keyword[]
  @Output() valueChange: EventEmitter<Keyword[]> = new EventEmitter()

  keywordTypes = ['temporal', 'theme', 'other'] as KeywordType[]

  get filteredKeywords(): Keyword[] {
    return (
      this.value?.filter(
        (keyword) =>
          keyword.type !== 'place' && // filter out place keywords
          !SPATIAL_SCOPES.some(
            (spatialScope) => spatialScope.label === keyword.label
          ) // filter out keywords matching spatialScope keys
      ) || []
    )
  }

  async handleKeywordsChange(keywords: Keyword[]) {
    const filteredKeywords = await firstValueFrom(
      this.editorFacade.record$.pipe(
        map((record) =>
          record.keywords.filter(
            (k) =>
              k.type === 'place' || // get back place keyword
              SPATIAL_SCOPES.some(
                (spatialScope) => spatialScope.label === k.label // get back spatialScope keywords
              )
          )
        )
      )
    )

    const allKeywords = [...filteredKeywords, ...keywords]
    this.valueChange.emit(allKeywords)
  }
}
