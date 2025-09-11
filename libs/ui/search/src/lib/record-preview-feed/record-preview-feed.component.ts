import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import Duration from 'duration-relativetimeformat'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  matCloudDownloadOutline,
  matHomeWorkOutline,
  matMapOutline,
} from '@ng-icons/material-icons/outline'
import { matFace } from '@ng-icons/material-icons/baseline'
import {
  MarkdownParserComponent,
  ThumbnailComponent,
} from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'

marker('record.was.created.time')

@Component({
  selector: 'gn-ui-record-preview-feed',
  templateUrl: './record-preview-feed.component.html',
  styleUrls: ['./record-preview-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RecordPreviewComponent,
    NgIcon,
    ThumbnailComponent,
    MarkdownParserComponent,
    TranslateDirective,
  ],
  viewProviders: [
    provideIcons({
      matMapOutline,
      matCloudDownloadOutline,
      matFace,
      matHomeWorkOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
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
