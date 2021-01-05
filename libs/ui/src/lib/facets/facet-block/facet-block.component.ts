import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModelBlock, ModelItem } from '../facets.model'
import { AggregationsTypesEnum } from '../../../../../search/src/lib/facets/facets.model'

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
  @Input() selectedPaths: string[][]

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<string[]>()
  @Output() itemUnselected = new EventEmitter<string[]>()
  @Output() more = new EventEmitter<void>()

  title: string
  hasItems: boolean

  constructor() {}

  ngOnInit(): void {
    this.title = this.model.key
    this.hasItems = this.countItems() > 0
  }

  countItems() {
    return this.model.type === AggregationsTypesEnum.FILTERS
      ? this.model.items.reduce((sum, current) => sum + current.count, 0)
      : this.model.items.length
  }
  toggleCollapsed() {
    this.collapsed = !this.collapsed
  }

  onFilterChange(value: string) {
    this.filterChange.emit(value)
  }

  isItemSelected(item: ModelItem) {
    return this.selectedPaths
      .map((path) => JSON.stringify(path))
      .includes(JSON.stringify(item.path))
  }

  onItemSelectedChange(selected: boolean, item: ModelItem) {
    if (selected) {
      this.itemSelected.emit(item.path)
    } else {
      this.itemUnselected.emit(item.path)
    }
  }

  onItemInvertedChange(inverted: boolean, item: ModelItem) {
    // TODO: ???
    console.log('onListItemInvertedChange', inverted, item)
  }

  onMoreClick(event: Event) {
    event.preventDefault()
    this.more.emit()
  }

  getItems() {
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
  @Input() selectedPaths: string[][]

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<string[]>()
  @Output() itemUnselected = new EventEmitter<string[]>()
}
