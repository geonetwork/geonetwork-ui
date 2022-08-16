import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { TranslateService } from '@ngx-translate/core'
import Duration from 'duration-relativetimeformat'

@Component({
  selector: 'gn-ui-record-preview-feed',
  templateUrl: './record-preview-feed.component.html',
  styleUrls: ['./record-preview-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewFeedComponent extends RecordPreviewComponent {
  timeFormat = new Duration(this.translate.currentLang, {})

  constructor(
    protected elementRef: ElementRef,
    private translate: TranslateService
  ) {
    super(elementRef)
  }

  get hasOrganization() {
    return this.record.contact && this.record.contact.organisation
  }
  get hasLogo() {
    return this.record.contact && this.record.contact.logoUrl
  }
  get hasOnlyPerson() {
    return (
      this.record.contact &&
      !this.record.contact.organisation &&
      this.record.contact.name
    )
  }
  get time() {
    return this.timeFormat.format(this.record.createdOn, Date.now())
  }
}
