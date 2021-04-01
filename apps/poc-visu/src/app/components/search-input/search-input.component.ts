import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { SearchApiService } from '@lib/gn-api'
import { ElasticsearchMapper, SearchFacade } from '@lib/search'
import { SearchResponse } from 'elasticsearch'
import { Observable } from 'rxjs'
import { debounceTime, filter, map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit, AfterViewInit {
  control = new FormControl()
  suggestions: Observable<string[]>

  @ViewChild('searchInput') searchInputRef: ElementRef<HTMLInputElement>
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger

  constructor(
    private searchService: SearchApiService,
    private esMapper: ElasticsearchMapper,
    private searchFacade: SearchFacade
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchInputRef.nativeElement.focus()
    }, 0)
  }

  ngOnInit(): void {
    this.suggestions = this.control.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(300),
      switchMap((inputValue) => this.getSuggestions(inputValue))
    )
  }

  triggerSearch(value: string) {
    this.searchFacade.setFilters({ any: value })
    this.autocomplete.closePanel()
  }

  clear(): void {
    this.searchInputRef.nativeElement.value = ''
    this.searchInputRef.nativeElement.focus()
  }

  private getSuggestions(query: string): Observable<string[]> {
    const payload = {
      query: {
        function_score: {
          boost: 5,
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query,
                    type: 'bool_prefix',
                    fields: [
                      'resourceTitleObject.*',
                      'resourceAbstractObject.*',
                      'tag',
                      'resourceIdentifier',
                    ],
                  },
                },
                {
                  terms: {
                    isTemplate: ['n'],
                  },
                },
              ],
            },
          },
        },
      },
      _source: ['uuid', 'id', 'title', 'resourceTitleObject'],
    }

    return this.searchService.search('bucket', JSON.stringify(payload)).pipe(
      map((response: SearchResponse<any>) => {
        const records = this.esMapper.toRecordSummary(
          response,
          this.searchService.configuration.basePath
        )
        return records.map((record) => record.title)
      })
    )
  }
}
