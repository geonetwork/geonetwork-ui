import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { ResultsLayoutConfigItem } from '../results-list/results-layout.config'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-results-list-item',
  templateUrl: './results-list-item.component.html',
  styleUrls: ['./results-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListItemComponent implements OnChanges, AfterViewInit {
  @Input() layoutConfig: ResultsLayoutConfigItem
  @Input() record: CatalogRecord
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() metadataQualityDisplay: boolean
  @Input() linkHref: string
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
  initialized = false

  @ViewChild('card', { read: ViewContainerRef }) cardRef: ViewContainerRef

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

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
        this.layoutConfig.component
      )
    this.cardRef.clear()
    const componentFactory =
      this.cardRef.createComponent<RecordPreviewComponent>(resolver)
    componentFactory.instance.metadataQualityDisplay =
      this.metadataQualityDisplay
    componentFactory.instance.record = this.record
    componentFactory.instance.favoriteTemplate = this.favoriteTemplate
    componentFactory.instance.mdSelect.subscribe((record) =>
      this.mdSelect.emit(record)
    )
    componentFactory.instance.linkHref = this.linkHref
    componentFactory.changeDetectorRef.detectChanges()
  }
}
