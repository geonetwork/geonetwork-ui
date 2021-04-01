import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { RecordSummary } from '@lib/common'
import { fromEvent, Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit, OnDestroy {
  @Input() record: RecordSummary
  @Input() linkTarget = '_blank'
  @Output() mdSelect = new EventEmitter<RecordSummary>()
  subscription = new Subscription()

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

  get isViewable() {
    return this.record.viewable
  }
  get isDownloadable() {
    return this.record.downloadable
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
