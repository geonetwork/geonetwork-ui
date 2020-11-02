import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() title: string
  @Input() canFilter: boolean
  @Input() filter: string
  @Input() model: any

  @Output() filterChange = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  onFilterChange(value: string) {
    this.filterChange.emit(value)
  }

  onListItemSelectedChange(selected: boolean, item: any) {
    // TODO: ???
    console.log('onListItemSelectedChange', selected, item)
  }

  onListItemInvertedChange(inverted: boolean, item: any) {
    // TODO: ???
    console.log('onListItemInvertedChange', inverted, item)
  }

  onMoreClick() {
    // TODO: ???
    console.log('onMoreClick')
  }

  getListItems() {
    return this.model.items
  }

  canShowMore() {
    return this.model.more
  }
}
