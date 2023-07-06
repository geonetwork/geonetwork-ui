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
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { ResultsLayoutConfigItem } from '../results-list/results-layout.config'

@Component({
  selector: 'gn-ui-results-list-item',
  templateUrl: './results-list-item.component.html',
  styleUrls: ['./results-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListItemComponent implements OnChanges, AfterViewInit {
  @Input() layoutConfig: ResultsLayoutConfigItem
  @Input() record: MetadataRecord
  @Input() favoriteTemplate: TemplateRef<{ $implicit: MetadataRecord }>
  @Input() linkHref: string
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
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
    componentFactory.instance.record = this.record
    componentFactory.instance.favoriteTemplate = this.favoriteTemplate
    componentFactory.instance.mdSelect.subscribe((record) =>
      this.mdSelect.emit(record)
    )
    componentFactory.instance.linkHref = this.linkHref
    componentFactory.changeDetectorRef.detectChanges()
  }
}
