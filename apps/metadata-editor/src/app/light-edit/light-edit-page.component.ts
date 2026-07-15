import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { PublicationVersionError } from '@geonetwork-ui/common/domain/model/error'
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

marker('editor.record.reuse.saveSuccess.title')
marker('editor.record.reuse.saveSuccess.body')
marker('editor.record.reuse.saveError.title')
marker('editor.record.reuse.saveError.body')

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
  private router = inject(Router)

  subscription = new Subscription()

  isLoading = true

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`

  private contacts: Individual[] = []
  // copy of the first contact: ContactDetailsFormComponent mutates its input
  pointOfContact$ = this.facade.record$.pipe(
    map((record) => ({
      firstName: '',
      lastName: '',
      email: '',
      role: 'point_of_contact' as const,
      organization: { name: '' },
      ...record.contacts?.[0],
    }))
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
        this.contacts = record.contacts ?? []
      })
    )

    this.subscription.add(
      this.facade.saveError$.subscribe((error) => {
        if (error instanceof PublicationVersionError) {
          this.notificationsService.showNotification(
            {
              type: 'error',
              title: this.translateService.instant(
                'editor.record.publishVersionError.title'
              ),
              text: this.translateService.instant(
                'editor.record.publishVersionError.body',
                { currentVersion: error.detectedApiVersion }
              ),
              closeMessage: this.translateService.instant(
                'editor.record.publishVersionError.closeMessage'
              ),
            },
            undefined,
            error
          )
        } else {
          this.notificationsService.showNotification(
            {
              type: 'error',
              title: this.translateService.instant(
                'editor.record.reuse.saveError.title'
              ),
              text: `${this.translateService.instant(
                'editor.record.reuse.saveError.body'
              )} ${error.message}`,
              closeMessage: this.translateService.instant(
                'editor.record.loadError.closeMessage'
              ),
            },
            undefined,
            error
          )
        }
      })
    )

    this.subscription.add(
      this.facade.saveSuccess$.subscribe(() => {
        this.notificationsService.showNotification(
          {
            type: 'success',
            title: this.translateService.instant(
              'editor.record.reuse.saveSuccess.title'
            ),
            text: this.translateService.instant(
              'editor.record.reuse.saveSuccess.body'
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
    this.facade.updateRecordField('contacts', [
      contact,
      ...this.contacts.slice(1),
    ])
  }

  leave() {
    const url = this.route.snapshot.queryParamMap.get('redirect_on_leave')
    // only allow http(s) redirect targets (e.g. no javascript: urls)
    if (url && /^https?:\/\//.test(url)) {
      window.open(url, '_self')
    } else {
      this.router.navigate(['catalog', 'search'])
    }
  }
}
