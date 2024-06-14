import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
import { filter, Subscription, take } from 'rxjs'

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
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const [currentRecord, currentRecordSource, currentRecordAlreadySaved] =
      this.route.snapshot.data['record']
    this.facade.openRecord(
      currentRecord,
      currentRecordSource,
      currentRecordAlreadySaved
    )

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

    // if we're on the /create route, go to /edit/{uuid} on first change
    if (this.route.snapshot.routeConfig?.path.includes('create')) {
      this.facade.draftSaveSuccess$.pipe(take(1)).subscribe(() => {
        this.router.navigate(['edit', currentRecord.uniqueIdentifier])
      })
    }

    // if the record unique identifier changes, navigate to /edit/newUuid
    this.facade.record$
      .pipe(
        filter(
          (record) =>
            record?.uniqueIdentifier !== currentRecord.uniqueIdentifier
        ),
        take(1)
      )
      .subscribe((savedRecord) => {
        this.router.navigate(['edit', savedRecord.uniqueIdentifier])
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
