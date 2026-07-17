import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import { KeywordBadgeComponent } from '@geonetwork-ui/ui/elements'
import { map } from 'rxjs'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'

type AutocompleteItem = { title: string; value: Keyword }

@Component({
  selector: 'gn-ui-generic-keywords',
  templateUrl: './generic-keywords.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AutocompleteComponent, KeywordBadgeComponent],
})
export class GenericKeywordsComponent {
  private platformService = inject(PlatformServiceInterface)

  @Input() keywords: Keyword[]
  @Input() keywordTypes: KeywordType[]
  @Input() placeholder: string
  @Input() allowSubmit: boolean
  @Output() changedKeywords: EventEmitter<Keyword[]> = new EventEmitter()
  @Output() addedKeyword: EventEmitter<Keyword> = new EventEmitter()
  @Output() deletedKeyword: EventEmitter<Keyword> = new EventEmitter()

  displayWithFn = (item: AutocompleteItem) => {
    return `${item.title} (${item.value.thesaurus?.name})`
  }

  autoCompleteAction = (query: string) => {
    return this.platformService.searchKeywords(query, this.keywordTypes).pipe(
      map((keywords) =>
        keywords.map((keyword) => {
          return { title: keyword.label, value: keyword }
        })
      )
    )
  }

  handleItemSelection(item: AutocompleteItem) {
    this.addKeyword(item.value)
  }

  addKeyword(keyword: Keyword) {
    const duplicatedKeyword = this.keywords.find(
      (k) => k.label === keyword.label
    )
    if (!duplicatedKeyword) {
      this.keywords = [...this.keywords, keyword]
      this.changedKeywords.emit(this.keywords)
      this.addedKeyword.emit(keyword)
    }
  }

  removeKeyword(keyword: Keyword) {
    this.keywords = this.keywords.filter((k) => k.label !== keyword.label)
    this.changedKeywords.emit(this.keywords)
    this.deletedKeyword.emit(keyword)
  }
}
