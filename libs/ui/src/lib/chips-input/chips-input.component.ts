import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit, Output } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'

export interface Items {
  display: string
  value: string
}

@Component({
  selector: 'ui-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css'],
})
export class ChipsInputComponent implements OnInit {
  @Input() url: (text) => string
  @Input() placeholder: string
  @Input() selectedItems: Items[]
  @Output() itemsChange: Observable<Items[]>

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
  }

  ngOnInit(): void {
    this.items = this.selectedItems
  }
}
