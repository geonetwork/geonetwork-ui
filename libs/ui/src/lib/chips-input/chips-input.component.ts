import { Component, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

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
  @Output() itemsChange: Observable<Items[]>

  rawChange: BehaviorSubject<Items[]>

  items: Items[] = []

  onChange(event) {
    this.rawChange.next(this.items)
  }

  requestAutocompleteItems = (text: string): Observable<any> => {
    const url = this.url(text)
    return this.http
      .get<any>(url)
      .pipe(map((item) => item.map((i) => i.values.eng)))
  }

  constructor(private http: HttpClient) {
    this.rawChange = new BehaviorSubject<Items[]>(this.items)
    this.itemsChange = this.rawChange.pipe(distinctUntilChanged())
  }

  ngOnInit(): void {}
}
