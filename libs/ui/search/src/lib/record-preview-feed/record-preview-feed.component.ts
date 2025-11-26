import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  MarkdownParserComponent,
  ThumbnailComponent,
} from '@geonetwork-ui/ui/elements'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matFace } from '@ng-icons/material-icons/baseline'
import {
  matCloudDownloadOutline,
  matHomeWorkOutline,
  matMapOutline,
} from '@ng-icons/material-icons/outline'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import Duration from 'duration-relativetimeformat'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

marker('record.was.created.time')

@Component({
  selector: 'gn-ui-record-preview-feed',
  templateUrl: './record-preview-feed.component.html',
  styleUrls: ['./record-preview-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
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
  protected elementRef: ElementRef
  private translate = inject(TranslateService)

  timeFormat = new Duration(this.translate.currentLang, {})

  constructor() {
    const elementRef = inject(ElementRef)

    super(elementRef)

    this.elementRef = elementRef
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
