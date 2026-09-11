import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { ResultsLayoutConfigItem } from '../results-list/results-layout.config'

@Component({
  selector: 'gn-ui-results-list-item',
  templateUrl: './results-list-item.component.html',
  styleUrls: ['./results-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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

  ngAfterViewInit(): void {
    this.initialized = true
    this.loadComponent()
  }

  ngOnChanges(): void {
    if (this.initialized) this.loadComponent()
  }

  loadComponent() {
    this.cardRef.clear()
    const componentRef = this.cardRef.createComponent<RecordPreviewComponent>(
      this.layoutConfig.component
    )
    componentRef.instance.metadataQualityDisplay = this.metadataQualityDisplay
    componentRef.instance.record = this.record
    componentRef.instance.favoriteTemplate = this.favoriteTemplate
    componentRef.instance.mdSelect.subscribe((record) =>
      this.mdSelect.emit(record)
    )
    componentRef.instance.linkHref = this.linkHref
    componentRef.changeDetectorRef.detectChanges()
  }
}
