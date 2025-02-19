import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { TranslateService } from '@ngx-translate/core'
import Duration from 'duration-relativetimeformat'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('record.was.created.time')

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
    return !!this.record.ownerOrganization
  }
  get hasLogo() {
    return !!this.record.ownerOrganization?.logoUrl
  }
  get hasOnlyPerson() {
    return false // FIXME: this doesn't make sense anymore, there should always be an owner org
  }
  get time() {
    return this.timeFormat.format(this.record.recordCreated, Date.now())
  }
}
