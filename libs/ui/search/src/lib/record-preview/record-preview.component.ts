import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit, OnDestroy {
  @Input() record: MetadataRecord
  @Input() linkTarget = '_blank'
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
  subscription = new Subscription()

  get isViewable() {
    return this.record.hasMaps
  }
  get isDownloadable() {
    return this.record.hasDownloads
  }

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
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
