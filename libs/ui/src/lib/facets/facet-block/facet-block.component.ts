import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { AggregationsTypesEnum } from '@lib/common'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { ModelBlock, ModelItem } from '../facets.model'

@Component({
  selector: 'ui-facet-block',
  templateUrl: './facet-block.component.html',
  styleUrls: ['./facet-block.component.css'],
})
export class FacetBlockComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() collapsed: boolean
  @Input() filter: string
  @Input() model: ModelBlock
  @Input() selectedPaths: string[][]

  @ViewChild('filterInput') eltFilterInputRef: ElementRef<HTMLInputElement>

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<string[]>()
  @Output() itemUnselected = new EventEmitter<string[]>()
  @Output() more = new EventEmitter<void>()

  title: string
  hasItems: boolean
  private subscription = new Subscription()

  constructor() {}

  ngOnInit(): void {
    this.title = this.model.key
    this.hasItems = this.countItems() > 0
  }

  ngAfterViewInit(): void {
    if (this.eltFilterInputRef) {
      this.subscription.add(
        fromEvent<Event>(this.eltFilterInputRef.nativeElement, 'keyup')
          .pipe(debounceTime(300))
          .subscribe((event) =>
            this.onFilterChange((event.target as HTMLInputElement).value)
          )
      )
    }
  }

  get canFilter(): boolean {
    return this.model.includeFilter
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({ selector: 'ui-facet-block', template: '' })
export class FacetBlockStubComponent implements Partial<FacetBlockComponent> {
  @Input() title: string
  @Input() model: ModelBlock
  @Input() selectedPaths: string[][]

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<string[]>()
  @Output() itemUnselected = new EventEmitter<string[]>()
}
