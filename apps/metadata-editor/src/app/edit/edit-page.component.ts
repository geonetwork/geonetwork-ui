import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  EditorFacade,
  RecordFormComponent,
} from '@geonetwork-ui/feature/editor'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { PublishButtonComponent } from './components/publish-button/publish-button.component'
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component'
import {
  NotificationsContainerComponent,
  NotificationsService,
} from '@geonetwork-ui/feature/notifications'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'md-editor-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
  standalone: true,
  imports: [
    RecordFormComponent,
    CommonModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    PublishButtonComponent,
    TopToolbarComponent,
    NotificationsContainerComponent,
  ],
})
export class EditPageComponent implements OnInit, OnDestroy {
  subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private facade: EditorFacade,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const currentRecord = this.route.snapshot.data['record']
    this.facade.openRecord(currentRecord)

    this.subscription.add(
      this.facade.saveError$.subscribe((error) => {
        this.notificationsService.showNotification({
          type: 'error',
          title: this.translateService.instant(
            'editor.record.publishError.title'
          ),
          text: `${this.translateService.instant(
            'editor.record.publishError.body'
          )} ${error}`,
          closeMessage: this.translateService.instant(
            'editor.record.publishError.closeMessage'
          ),
        })
      })
    )

    this.subscription.add(
      this.facade.saveSuccess$.subscribe(() => {
        this.notificationsService.showNotification(
          {
            type: 'success',
            title: this.translateService.instant(
              'editor.record.publishSuccess.title'
            ),
            text: `${this.translateService.instant(
              'editor.record.publishSuccess.body'
            )}`,
          },
          2500
        )
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
