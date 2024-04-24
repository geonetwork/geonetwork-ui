import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { filter, switchMap, takeUntil } from 'rxjs/operators'
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs'
import {
  UserFeedback,
  UserFeedbackViewModel,
} from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { DropdownChoice } from '@geonetwork-ui/ui/inputs'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { TranslateService } from '@ngx-translate/core'
import { AuthService, Gn4PlatformMapper } from '@geonetwork-ui/api/repository'

type UserFeedbackSortingFunction = (
  userFeedbackA: UserFeedback,
  userFeedbackB: UserFeedback
) => number

@Component({
  selector: 'datahub-record-user-feedbacks',
  templateUrl: './record-user-feedbacks.component.html',
  styleUrls: ['./record-user-feedbacks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordUserFeedbacksComponent implements OnInit, OnDestroy {
  @Input() organisationName$: Observable<string>
  @Input() metadataUuid: string

  destroy$ = new Subject<void>()

  userFeedbacksParents: UserFeedbackViewModel[] = []
  userFeedBacksAnswers: Map<string, UserFeedbackViewModel[]> = new Map()

  newComment = ''

  isNewCommentEmpty = true

  activeUser$: Observable<UserModel>
  activeUser?: UserModel
  isActiveUserMetadaEditor = false

  loginUrl = this.authService.loginUrl

  sortingStrategyList: Array<DropdownChoice> = [
    {
      value: this.sortByDateFromNewestToOldest,
      label: this.translate.instant(
        'record.metadata.userFeedbacks.sortSelector.choices.newestFirst'
      ),
    },
    {
      value: this.sortByDateFromOldestToNewest,
      label: this.translate.instant(
        'record.metadata.userFeedbacks.sortSelector.choices.oldestFirst'
      ),
    },
  ]

  selectedSortingStrategy$ = new BehaviorSubject<UserFeedbackSortingFunction>(
    this.sortByDateFromNewestToOldest
  )

  isAllUserFeedbackLoading = false
  isAddUserFeedbackLoading = false

  constructor(
    private readonly translate: TranslateService,
    private readonly authService: AuthService,
    private readonly metadataViewFacade: MdViewFacade,
    private readonly cdr: ChangeDetectorRef,
    private readonly mapper: Gn4PlatformMapper,
    private readonly platformServiceInterface: PlatformServiceInterface
  ) {
    this.activeUser$ = this.platformServiceInterface.getMe()
  }

  ngOnInit(): void {
    this.metadataViewFacade.isAllUserFeedbackLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isAllUserFeedbackLoading = isLoading))

    this.metadataViewFacade.isAddUserFeedbackLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isAddUserFeedbackLoading = isLoading))

    this.metadataViewFacade.loadUserFeedbacks(this.metadataUuid)

    this.activeUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.activeUser = user
      this.isActiveUserMetadaEditor = [
        'Administrator',
        'UserAdmin',
        'Reviewer',
        'Editor',
      ].includes(user?.profile)
    })

    combineLatest([
      this.metadataViewFacade.userFeedbacks$,
      this.selectedSortingStrategy$,
      this.activeUser$,
    ])
      .pipe(
        filter(([userFeedbacks]) => Boolean(userFeedbacks)),
        takeUntil(this.destroy$),
        switchMap(
          async ([userFeedbacks, selectedSortingStrategy, activeUser]) => {
            this.activeUser = activeUser

            const userFeedbacksParents = userFeedbacks
              .filter((feedback) => !feedback.parentUuid)
              .sort(selectedSortingStrategy)

            const userFeedbacksAnswers = userFeedbacks
              .filter((feedback) => feedback.parentUuid)
              .sort(this.sortByDateFromOldestToNewest)

            const userFeedbacksParentsViewModels = await Promise.all(
              userFeedbacksParents.map((feedback) =>
                this.mapper.createUserFeedbackViewModel(feedback)
              )
            )

            const userFeedbacksAnswersViewModels = await Promise.all(
              userFeedbacksAnswers.map((feedback) =>
                this.mapper.createUserFeedbackViewModel(feedback)
              )
            )

            const userFeedBacksAnswersMap = new Map()
            userFeedbacksAnswersViewModels.forEach(
              (userFeedbackAnswerViewModel) => {
                const parentUuid = userFeedbackAnswerViewModel.parentUuid
                if (userFeedBacksAnswersMap.has(parentUuid)) {
                  userFeedBacksAnswersMap
                    .get(parentUuid)
                    .push(userFeedbackAnswerViewModel)
                } else {
                  userFeedBacksAnswersMap.set(parentUuid, [
                    userFeedbackAnswerViewModel,
                  ])
                }
              }
            )

            return {
              parentsViewModels: userFeedbacksParentsViewModels,
              answersMap: userFeedBacksAnswersMap,
            }
          }
        )
      )
      .subscribe({
        next: ({ parentsViewModels, answersMap }) => {
          this.userFeedbacksParents = parentsViewModels
          this.userFeedBacksAnswers = answersMap
          this.cdr.markForCheck()
        },
        error: (err) => {
          console.error('Error processing feedback', err)
        },
      })
  }

  onNewCommentValueChange() {
    this.isNewCommentEmpty = this.newComment.length === 0
  }

  onNewUserFeedbackAnswer(newUserFeedback: UserFeedbackViewModel) {
    delete newUserFeedback.avatarUrl
    this.newUserFeedback(newUserFeedback)
  }

  publishNewComment() {
    if (this.newComment.trim() === '') return

    const newUserFeedback: UserFeedback = {
      uuid: undefined,
      comment: this.newComment,
      metadataUUID: this.metadataUuid,
      parentUuid: null,
      published: true,
      date: new Date(),
      authorUserId: this.activeUser?.id,
      authorEmail: this.activeUser?.email,
      authorName: `${this.activeUser?.name} ${this.activeUser?.surname}`,
    }

    this.newUserFeedback(newUserFeedback)
    this.newComment = ''
    this.onNewCommentValueChange()
  }

  changeSort(selectedSortingStrategy: UserFeedbackSortingFunction) {
    this.selectedSortingStrategy$.next(selectedSortingStrategy)
  }

  private newUserFeedback(newUserFeedback: UserFeedback) {
    this.metadataViewFacade.addUserFeedback(newUserFeedback)
  }

  private sortByDateFromNewestToOldest(
    userFeedbackA: UserFeedback,
    userFeedbackB: UserFeedback
  ): number {
    return userFeedbackB.date.getTime() - userFeedbackA.date.getTime()
  }

  private sortByDateFromOldestToNewest(
    userFeedbackA: UserFeedback,
    userFeedbackB: UserFeedback
  ): number {
    return userFeedbackA.date.getTime() - userFeedbackB.date.getTime()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
