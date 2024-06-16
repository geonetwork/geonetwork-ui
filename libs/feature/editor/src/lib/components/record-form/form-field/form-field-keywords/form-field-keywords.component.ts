import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { map } from 'rxjs'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'

type AutocompleteItem = { title: string; value: Keyword }

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
  ],
})
export class FormFieldKeywordsComponent {
  @Input() control: FormControl<Keyword[]>

  displayWithFn = (item: AutocompleteItem) => {
    return `${item.title} (${item.value.thesaurus?.name})`
  }

  autoCompleteAction = (query: string) => {
    return this.platformService.searchKeywords(query).pipe(
      map((keywords) =>
        keywords.map((keyword) => {
          return { title: keyword.label, value: keyword }
        })
      )
    )
  }

  constructor(private platformService: PlatformServiceInterface) {}

  handleItemSelection(item: AutocompleteItem) {
    this.addKeyword(item.value)
  }

  addKeyword(keyword: Keyword) {
    const addedKeywords = [...this.control.value, keyword]

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
