import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { GenericKeywordsComponent } from '../../../generic-keywords/generic-keywords.component'
import { TranslatePipe } from '@ngx-translate/core'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'
import { EditorFacade } from '../../../../+state/editor.facade'
import { firstValueFrom, map } from 'rxjs'
import { SPATIAL_SCOPES } from '../../../../fields.config'

@Component({
  selector: 'gn-ui-form-field-keywords',
  templateUrl: './form-field-keywords.component.html',
  styleUrls: ['./form-field-keywords.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GenericKeywordsComponent, TranslatePipe],
})
export class FormFieldKeywordsComponent {
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

  constructor(private editorFacade: EditorFacade) {}

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
