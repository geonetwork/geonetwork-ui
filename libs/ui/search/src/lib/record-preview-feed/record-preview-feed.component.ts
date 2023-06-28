import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Optional,
} from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { TranslateService } from '@ngx-translate/core'
import Duration from 'duration-relativetimeformat'
import { IRightClickToken, RIGHT_CLICK_TOKEN } from '@geonetwork-ui/util/shared'

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
    private translate: TranslateService,
    @Optional()
    @Inject(RIGHT_CLICK_TOKEN)
    private rightClickService: IRightClickToken
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

  getTargetUrl() {
    return this.rightClickService?.datasetUrl
      ? `${this.rightClickService?.datasetUrl}${this.record.uuid}`
      : null
  }
}
