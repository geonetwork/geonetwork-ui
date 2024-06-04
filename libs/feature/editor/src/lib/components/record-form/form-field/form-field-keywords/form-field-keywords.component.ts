import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'
import { KeywordType } from '@geonetwork-ui/common/domain/model/record'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus'
import {
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { LangService } from '@geonetwork-ui/util/i18n'
import { Observable, map } from 'rxjs'

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
  ],
})
export class FormFieldKeywordsComponent {
  @Input() control: FormControl<any>
  @Output() itemSelected = new EventEmitter<string>()
  @Output() inputSubmitted = new EventEmitter<string>()
  searchInputValue$: Observable<void | { title: string }>
  allThesaurus$: Observable<any[]>

  displayWithFn = (item) => {
    if (item) {
      return `${item?.title} (${item?.value?.name})`
    }
    return null
  }

  autoCompleteAction = (query: string) => {
    const keywords$ = this.gn4platformService
      .getKeywordsFromThesaurus('', query)
      .pipe(
        map((thesaurus) =>
          thesaurus.map((thes) => {
            return { title: thes.label, value: thes.thesaurus }
          })
        )
      )

    return keywords$
  }

  constructor(
    private langService: LangService,
    private gn4platformService: Gn4PlatformService
  ) {}

  // type: { title: string; value: ThesaurusModel }
  handleItemSelection(item) {
    this.addKeyword({
      label: item.title,
      thesaurus: item.value,
      type: item.value.dname as KeywordType,
    })
  }

  handleInputSubmission(any: string) {
    // Should there be an input submission?

    if (this.inputSubmitted.observers.length > 0) {
      this.inputSubmitted.emit(any)
    } else {
      // this.searchService.updateFilters({ any })
    }
  }

  async handleInputCleared() {
    this.autoCompleteAction('')
  }

  addKeyword(item: {
    label: string
    thesaurus: ThesaurusModel
    type: KeywordType
  }) {
    const addedKeywords = [...this.control.value, item]

    // remove duplicates from keyword
    const filteredKeywords = addedKeywords.filter((value, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t?.label === value?.label &&
            t?.thesaurus?.id === value?.thesaurus?.id &&
            t?.type === value?.type
        )
      )
    })

    this.control.setValue(filteredKeywords)
  }

  removeKeyword(index: number) {
    const removeKeywords = this.control.value.filter((_, i) => i !== index)

    this.control.setValue(removeKeywords)
  }
}
