import { HttpClient } from '@angular/common/http'
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { LANG_2_TO_3_MAPPER } from '@lib/common'
import { TranslateService } from '@ngx-translate/core'
import { Observable, of, Subject, Subscription } from 'rxjs'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'

export interface Items {
  display: string
  value: string
}

@Component({
  selector: 'ui-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css'],
})
export class ChipsInputComponent implements OnInit, OnDestroy {
  @Input() url: (text) => string
  @Input() placeholder: string
  @Input() selectedItems: Items[]
  @Input() required = false
  @Input() autocompleteItems: Items[]
  @Output() itemsChange: Observable<Items[]>

  private subscription: Subscription

  invalid = false

  rawChange: Subject<Items[]>

  items: Items[] = []

  onChange(event) {
    this.rawChange.next(event)
  }

  requestAutocompleteItems = (text: string): Observable<any> => {
    if (this.url) {
      const url = this.url(text)

      const lang = LANG_2_TO_3_MAPPER[this.translate.currentLang]
      return this.http
        .get<any>(url.replace('${lang}', lang))
        .pipe(map((item) => item.map((i) => i.values[lang])))
    } else if (this.autocompleteItems) {
      return of(this.autocompleteItems)
    }
  }

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.rawChange = new Subject<Items[]>()
    this.itemsChange = this.rawChange.pipe(distinctUntilChanged())
    this.subscription = new Subscription()
  }

  ngOnInit(): void {
    this.items = this.selectedItems
    this.subscription = this.rawChange
      .pipe(tap((v) => (this.invalid = v.length === 0)))
      .subscribe()
    this.rawChange.next(this.items)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
