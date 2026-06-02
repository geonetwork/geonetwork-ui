import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  OnlineLinkResource,
  OnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { UrlInputComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateService } from '@ngx-translate/core'

marker('editor.record.form.field.onlineLinkageResource.defaultName')

@Component({
  selector: 'gn-ui-form-field-online-single-link-resource',
  templateUrl: './form-field-online-single-link-resource.component.html',
  styleUrls: ['./form-field-online-single-link-resource.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UrlInputComponent],
})
export class FormFieldOnlineSingleLinkResourceComponent {
  private notificationsService = inject(NotificationsService)
  private translateService = inject(TranslateService)

  @Input() set value(onlineResources: Array<OnlineResource>) {
    this.allResources = onlineResources ?? []
    const firstResource = this.allResources[0]
    this.displayUrl = firstResource?.url?.toString() ?? ''
  }
  @Output() valueChange: EventEmitter<Array<OnlineResource>> =
    new EventEmitter()

  private allResources: OnlineResource[] = []
  displayUrl = ''

  handleUrlChange(url: string | null) {
    if (!url) return

    try {
      const parsedUrl = new URL(url)

      if (this.allResources.length === 0) {
        const defaultName = this.translateService.instant(
          'editor.record.form.field.onlineLinkageResource.defaultName'
        )
        const newResource: OnlineLinkResource = {
          type: 'link',
          url: parsedUrl,
          name: defaultName,
        }
        this.valueChange.emit([newResource])
      } else {
        const updatedFirst: OnlineResource = {
          ...this.allResources[0],
          url: parsedUrl,
        }
        this.valueChange.emit([updatedFirst, ...this.allResources.slice(1)])
      }
    } catch (error) {
      this.handleError(error as Error)
    }
  }

  private handleError(error: Error) {
    this.notificationsService.showNotification(
      {
        type: 'error',
        title: this.translateService.instant(
          'editor.record.onlineResourceError.title'
        ),
        text: `${this.translateService.instant(
          'editor.record.onlineResourceError.body'
        )} ${error.message}`,
        closeMessage: this.translateService.instant(
          'editor.record.onlineResourceError.closeMessage'
        ),
      },
      undefined,
      error
    )
  }
}
