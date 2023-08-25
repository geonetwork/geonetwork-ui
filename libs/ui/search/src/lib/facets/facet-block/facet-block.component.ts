import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import {
  FacetPath,
  FacetSelectEvent,
  ModelBlock,
  ModelItem,
} from '../facets.model'

@Component({
  selector: 'gn-ui-facet-block',
  templateUrl: './facet-block.component.html',
  styleUrls: ['./facet-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetBlockComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() collapsed: boolean
  @Input() filter: string
  @Input() model: ModelBlock
  @Input() selectedPaths: FacetPath[]

  @ViewChild('filterInput') eltFilterInputRef: ElementRef<HTMLInputElement>

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemChange = new EventEmitter<FacetSelectEvent>()
  @Output() more = new EventEmitter<void>()

  title: string
  hasItems: boolean
  private subscription = new Subscription()

  ngOnInit(): void {
    this.hasItems = this.countItems() > 0
    this.title = this.model.key
  }

  ngAfterViewInit(): void {
    if (this.eltFilterInputRef) {
      this.subscription.add(
        fromEvent<Event>(this.eltFilterInputRef.nativeElement, 'keyup')
          .pipe(debounceTime(300))
          .subscribe((event: any) =>
            this.onFilterChange((event.path[0] as HTMLInputElement).value)
          )
      )
    }
  }

  get canFilter(): boolean {
    return this.model.includeFilter
  }

  countItems() {
    return this.model.type === 'filters'
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

  emitItemChange(item: ModelItem): void {
    const eventOutput = { item, block: this.model }
    this.itemChange.emit(eventOutput)
  }

  onItemSelectedChange(selected: boolean, item: ModelItem) {
    item.selected = selected
    this.emitItemChange(item)
  }

  onItemInvertedChange(inverted: boolean, item: ModelItem) {
    item.inverted = inverted
    this.emitItemChange(item)
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

  ngOnChanges(changes: SimpleChanges): void {
    const model = changes.model
    if (model) {
      this.hasItems = this.countItems() > 0
    }
  }
}

@Component({ selector: 'gn-ui-facet-block', template: '' })
export class FacetBlockStubComponent implements Partial<FacetBlockComponent> {
  @Input() title: string
  @Input() model: ModelBlock
  @Input() selectedPaths: string[][]

  @Output() filterChange = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<string[]>()
  @Output() itemUnselected = new EventEmitter<string[]>()
}
