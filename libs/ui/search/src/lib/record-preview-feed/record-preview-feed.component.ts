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

  get contactLogoUrls() {
    return [{ url: this.contact.logoUrl }]
  }

  get thumbnailImageUrls() {
    return [{ url: this.record.thumbnailUrl }]
  }

  constructor(
    protected elementRef: ElementRef,
    private translate: TranslateService
  ) {
    super(elementRef)
  }

  get hasOrganization() {
    return this.contact && this.contact.organisation
  }
  get hasLogo() {
    return this.contact && this.contact.logoUrl
  }
  get hasOnlyPerson() {
    return this.contact && !this.contact.organisation && this.contact.name
  }
  get time() {
    return this.timeFormat.format(this.record.createdOn, Date.now())
  }
}
