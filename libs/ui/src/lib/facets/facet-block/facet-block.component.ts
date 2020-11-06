import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModelBlock } from '../facets.model'

@Component({
  selector: 'ui-facet-block',
  templateUrl: './facet-block.component.html',
  styleUrls: ['./facet-block.component.css'],
})
export class FacetBlockComponent implements OnInit {
  @Input() collapsed: boolean
  @Input() canFilter: boolean
  @Input() filter: string
  @Input() model: ModelBlock

  @Output() filterChange = new EventEmitter<string>()

  title: string

  constructor() {}

  ngOnInit(): void {
    this.title = this.model.key
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed
  }

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

@Component({ selector: 'ui-facet-block', template: '' })
export class FacetBlockStubComponent implements Partial<FacetBlockComponent> {
  @Input() title: string
  @Input() canFilter: boolean
  @Input() filter: string
  @Input() model: ModelBlock

  @Output() filterChange = new EventEmitter<string>()
}
