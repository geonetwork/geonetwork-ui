import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'
import { fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit, OnDestroy {
  @Input() record: RecordSummary
  @Input() linkTarget = '_blank'
  @Output() mdSelect = new EventEmitter<RecordSummary>()
  subscription = new Subscription()

  get isViewable() {
    return this.record.viewable
  }
  get isDownloadable() {
    return this.record.downloadable
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
