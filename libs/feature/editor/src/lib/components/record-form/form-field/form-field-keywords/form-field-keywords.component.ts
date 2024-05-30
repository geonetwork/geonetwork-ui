import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { Thesaurus } from '@geonetwork-ui/api/metadata-converter'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'
import {
  CatalogRecord,
  KeywordThesaurus,
} from '@geonetwork-ui/common/domain/model/record'
import { RegistriesApiService } from '@geonetwork-ui/data-access/gn4'
import {
  AutocompleteItem,
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { LangService } from '@geonetwork-ui/util/i18n'
import { Observable, map, of, shareReplay } from 'rxjs'

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

  displayWithFn = (label) => {
    return label
  }

  autoCompleteAction = (query: string) => {
    return this.gn4platformService
      .getKeywordsFromThesaurus('', query)
      .pipe(
        map((thesaurus) => thesaurus.map((thes) => ({ title: thes.label })))
      )
  }

  constructor(
    private langService: LangService,
    private gn4platformService: Gn4PlatformService
  ) {}

  //ngOnInit with initial request for the dropdown values?

  handleItemSelection(item: AutocompleteItem) {
    const record = item as string
    console.log('record', record) // thesaurus keyword as string - we should have a value?
    console.log(this.itemSelected.observers.length)

    // emit the value (no if/else?)
    if (this.itemSelected.observers.length > 0) {
      this.itemSelected.emit(record)
    } else {
      // this.searchFacade.setFilters({ any: record.title })
    }
    const keyword = { label: item }
    this.addKeyword(keyword)
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

    //   const currentSearchFilters: SearchFilters = await firstValueFrom(
    //     this.searchFacade.searchFilters$
    //   )
    //   if (currentSearchFilters.any) {
    //     this.searchService.updateFilters({ any: '' })
    //   }
  }

  //TODO: Update dropdown list when input cleared/ selected

  addKeyword(item: object) {
    const addedKeywords = [...this.control.value, item]

    // remove duplicates from keyword
    this.control.setValue([...new Set(addedKeywords)])
  }

  removeKeyword(index: number) {
    const removeKeywords = this.control.value.filter((_, i) => i !== index)

    this.control.setValue(removeKeywords)
    // this.control.setValue((previousValue) => {
    //   console.log('remove keyword', previousValue)
    //   // previousValue.value?.splice(index, 1)
    // })
    // this.selectedKeywords.splice(index, 1)
  }
}
