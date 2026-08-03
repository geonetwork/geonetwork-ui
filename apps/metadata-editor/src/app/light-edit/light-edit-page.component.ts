import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import {
  ContactDetailsFormComponent,
  DEFAULT_CONFIGURATION,
  EditorFacade,
  RecordFormComponent,
  REUSE_LIGHT_CONFIGURATION,
} from '@geonetwork-ui/feature/editor'
import {
  NotificationsContainerComponent,
  NotificationsService,
} from '@geonetwork-ui/feature/notifications'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { SpinningLoaderComponent } from '@geonetwork-ui/ui/widgets'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import { map, Subscription, take } from 'rxjs'
import { PageErrorComponent } from '../edit/components/page-error/page-error.component'
import { LightTopToolbarComponent } from './components/light-top-toolbar/light-top-toolbar.component'

marker('editor.record.light.saveSuccess.title')
marker('editor.record.light.saveSuccess.body')
marker('editor.record.light.saveError.title')
marker('editor.record.light.saveError.body')

@Component({
  selector: 'md-editor-light-edit',
  templateUrl: './light-edit-page.component.html',
  styleUrls: ['./light-edit-page.component.css'],
  standalone: true,
  imports: [
    RecordFormComponent,
    CommonModule,
    ContactDetailsFormComponent,
    LightTopToolbarComponent,
    NotificationsContainerComponent,
    SpinningLoaderComponent,
    PageErrorComponent,
    TranslateDirective,
  ],
})
export class LightEditPageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute)
  protected facade = inject(EditorFacade)
  private notificationsService = inject(NotificationsService)
  private translateService = inject(TranslateService)

  subscription = new Subscription()

  isLoading = true

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`

  private contacts: Individual[] = []
  firstContactForResource$ = this.facade.record$.pipe(
    map((record) => record.contactsForResource?.[0])
  )

  ngOnInit(): void {
    const [currentRecord, currentRecordSource] =
      this.route.snapshot.data['record']

    this.facade.setConfiguration(REUSE_LIGHT_CONFIGURATION)
    this.facade.openRecord(currentRecord, currentRecordSource)

    this.subscription.add(
      this.facade.record$.pipe(take(1)).subscribe(() => {
        this.isLoading = false
      })
    )

    this.subscription.add(
      this.facade.record$.subscribe((record) => {
        this.contacts = record.contactsForResource ?? []
      })
    )

    this.subscription.add(
      this.facade.saveError$.subscribe((error) => {
        this.notificationsService.showNotification(
          {
            type: 'error',
            title: this.translateService.instant(
              'editor.record.light.saveError.title'
            ),
            text: `${this.translateService.instant(
              'editor.record.light.saveError.body'
            )} ${error.message}`,
            closeMessage: this.translateService.instant(
              'editor.record.loadError.closeMessage'
            ),
          },
          undefined,
          error
        )
      })
    )

    this.subscription.add(
      this.facade.saveSuccess$.subscribe(() => {
        this.notificationsService.showNotification(
          {
            type: 'success',
            title: this.translateService.instant(
              'editor.record.light.saveSuccess.title'
            ),
            text: this.translateService.instant(
              'editor.record.light.saveSuccess.body'
            ),
          },
          2500
        )
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    // restore the full editor configuration for the regular edit pages
    this.facade.setConfiguration(DEFAULT_CONFIGURATION)
  }

  handleContactChange(contact: Individual) {
    this.facade.updateRecordField('contactsForResource', [
      contact,
      ...this.contacts.slice(1),
    ])
  }
}
