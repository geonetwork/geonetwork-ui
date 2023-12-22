import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import {
  propagateToDocumentOnly,
  stripHtml,
  removeWhitespace,
} from '@geonetwork-ui/util/shared'
import { fromEvent, Subscription } from 'rxjs'
import {
  CatalogRecord,
  DatasetRecord,
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit, OnDestroy {
  @Input() record: CatalogRecord
  @Input() linkTarget = '_blank'
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() linkHref: string = null
  @Input() metadataQualityDisplay: boolean
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
  subscription = new Subscription()
  abstract: string

  get isViewable() {
    return this.record.extras?.hasMaps // FIXME: this isn't assigned anymore, find a replacement
  }
  get isDownloadable() {
    return this.record.extras?.hasDownloads // FIXME: this isn't assigned anymore, find a replacement
  }
  get contact(): Individual {
    return (
      (this.record as DatasetRecord).contactsForResource?.[0] ||
      this.record.contacts[0]
    )
  }
  get organization(): Organization {
    return this.record.ownerOrganization
  }

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    this.abstract = removeWhitespace(stripHtml(this.record?.abstract))
    this.subscription.add(
      fromEvent(this.elementRef.nativeElement, 'click').subscribe(
        (event: Event) => {
          event.preventDefault()
          propagateToDocumentOnly(event)
          this.mdSelect.emit(this.record)
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
