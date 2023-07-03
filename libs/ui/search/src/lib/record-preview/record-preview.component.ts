import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  TemplateRef,
} from '@angular/core'
import {
  MetadataContact,
  MetadataRecord,
  stripHtml,
} from '@geonetwork-ui/util/shared'
import { fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit, OnDestroy {
  @Input() record: MetadataRecord
  @Input() linkTarget = '_blank'
  @Input() favoriteTemplate: TemplateRef<{ $implicit: MetadataRecord }>
  @Input() linkHref: string = null
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
  subscription = new Subscription()
  abstract: string

  get isViewable() {
    return this.record.hasMaps
  }
  get isDownloadable() {
    return this.record.hasDownloads
  }
  get contact(): MetadataContact {
    return this.record.resourceContacts?.[0] || this.record.contact
  }

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    this.abstract = stripHtml(this.record?.abstract)
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
