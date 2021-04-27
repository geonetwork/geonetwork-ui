import { HttpClient } from '@angular/common/http'
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Observable, Subject, Subscription } from 'rxjs'
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
  @Output() itemsChange: Observable<Items[]>

  private subscription: Subscription

  invalid = false

  rawChange: Subject<Items[]>

  items: Items[] = []

  onChange(event) {
    this.rawChange.next(event)
  }

  requestAutocompleteItems = (text: string): Observable<any> => {
    const url = this.url(text)
    return this.http
      .get<any>(url)
      .pipe(map((item) => item.map((i) => i.values.eng)))
  }

  constructor(private http: HttpClient) {
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
