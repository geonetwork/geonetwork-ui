import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {
  MetadataRecord,
  ResultsListLayoutEnum,
} from '@geonetwork-ui/util/shared'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import {
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigModel,
} from '../results-list/results-layout.config'

@Component({
  selector: 'gn-ui-results-list-item',
  templateUrl: './results-list-item.component.html',
  styleUrls: ['./results-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListItemComponent implements OnChanges, AfterViewInit {
  @Input() layout: ResultsListLayoutEnum
  @Input() record: MetadataRecord
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
  initialized = false

  @ViewChild('card', { read: ViewContainerRef }) cardRef: ViewContainerRef

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(RESULTS_LAYOUT_CONFIG)
    private resultsLayoutConfig: ResultsLayoutConfigModel
  ) {}

  ngAfterViewInit(): void {
    this.initialized = true
    this.loadComponent()
  }

  ngOnChanges(): void {
    if (this.initialized) this.loadComponent()
  }

  loadComponent() {
    const resolver =
      this.componentFactoryResolver.resolveComponentFactory<RecordPreviewComponent>(
        this.resultsLayoutConfig[this.layout].component
      )
    this.cardRef.clear()
    const componentFactory =
      this.cardRef.createComponent<RecordPreviewComponent>(resolver)
    componentFactory.instance.record = this.record
    componentFactory.instance.mdSelect.subscribe((record) =>
      this.mdSelect.emit(record)
    )
    componentFactory.changeDetectorRef.detectChanges()
  }
}
