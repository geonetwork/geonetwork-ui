import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core'
import { CatalogSource, SourcesService } from '@geonetwork-ui/feature/catalog'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { fromEvent, Observable, Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit, OnDestroy {
  @Input() record: MetadataRecord
  @Input() linkTarget = '_blank'
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
  subscription = new Subscription()
  source$: Observable<CatalogSource>

  get isViewable() {
    return this.record.hasMaps
  }
  get isDownloadable() {
    return this.record.hasDownloads
  }

  constructor(
    protected elementRef: ElementRef,
    protected sources: SourcesService
  ) {}

  ngOnInit(): void {
    this.source$ = this.sources.getSource(this.record.catalog)
    this.subscription.add(
      fromEvent(this.elementRef.nativeElement, 'click').subscribe(
        (event: Event) => {
          event.preventDefault()
          event.stopPropagation()
          this.mdSelect.emit(this.record)
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
