import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { GenericKeywordsComponent } from '../../../generic-keywords/generic-keywords.component'
import { TranslateModule } from '@ngx-translate/core'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'

@Component({
  selector: 'gn-ui-form-field-keywords',
  templateUrl: './form-field-keywords.component.html',
  styleUrls: ['./form-field-keywords.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DropdownSelectorComponent,
    UiInputsModule,
    CommonModule,
    UiWidgetsModule,
    AutocompleteComponent,
    GenericKeywordsComponent,
    TranslateModule,
  ],
})
export class FormFieldKeywordsComponent {
  @Input() value: Keyword[]
  @Output() valueChange: EventEmitter<Keyword[]> = new EventEmitter()

  keywordTypes = ['temporal', 'theme', 'other'] as KeywordType[]
  placeholder = 'editor.form.keywords.placeholder'

  handleKeywordsChange(keywords: Keyword[]) {
    this.valueChange.emit(keywords)
  }
}
