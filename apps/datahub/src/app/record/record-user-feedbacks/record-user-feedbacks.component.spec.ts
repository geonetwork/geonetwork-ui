import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { RecordUserFeedbacksComponent } from './record-user-feedbacks.component'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { ChangeDetectionStrategy } from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  barbieUserFixture,
  datasetRecordsFixture,
  someUserFeedbacksFixture,
} from '@geonetwork-ui/common/fixtures'
import {
  UserFeedback,
  UserFeedbackViewModel,
} from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from '@geonetwork-ui/api/repository'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('RecordUserFeedbacksComponent', () => {
  const allUserFeedbacks = someUserFeedbacksFixture()
  let mockDestroy$: Subject<void>

  const activeUser = barbieUserFixture()

  const mdViewFacadeMock: Partial<MdViewFacade> = {
    isAllUserFeedbackLoading$: new BehaviorSubject(false),
    isAddUserFeedbackLoading$: new BehaviorSubject(false),
    loadUserFeedbacks: jest.fn(),
    userFeedbacks$: of(allUserFeedbacks),
    addUserFeedback: jest.fn(),
  }

  const gn4PlatformMapperMock: Partial<Gn4PlatformMapper> = {
    createUserFeedbackViewModel: (baseUserFeedback) => {
      return Promise.resolve({
        ...baseUserFeedback,
        avatarUrl: 'someAvatarUrl',
      } as UserFeedbackViewModel)
    },
  }

  const platformServiceInterfaceMock: Partial<PlatformServiceInterface> = {
    getUserFeedbacks: jest.fn(),
    getMe: jest.fn(() => new BehaviorSubject(activeUser)),
  }

  let component: RecordUserFeedbacksComponent
  let fixture: ComponentFixture<RecordUserFeedbacksComponent>

  beforeEach(() => MockBuilder(RecordUserFeedbacksComponent))

  beforeEach(async () => {
    mockDestroy$ = new Subject()

    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(MdViewFacade, mdViewFacadeMock),
        MockProvider(PlatformServiceInterface, platformServiceInterfaceMock),
        MockProvider(Gn4PlatformMapper, gn4PlatformMapperMock),
      ],
    })
      .overrideComponent(RecordUserFeedbacksComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(RecordUserFeedbacksComponent)
    component = fixture.componentInstance

    component.destroy$ = mockDestroy$
    component.metadataUuid = datasetRecordsFixture()[0].uniqueIdentifier

    fixture.detectChanges()
  })

  afterEach(() => {
    mockDestroy$.next()
    mockDestroy$.complete()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('ngOnInit()', () => {
    it('should load user feedbacks', () => {
      component.ngOnInit()
      expect(mdViewFacadeMock.loadUserFeedbacks).toHaveBeenCalledWith(
        datasetRecordsFixture()[0].uniqueIdentifier
      )
    })
    it('should set active user', fakeAsync(() => {
      component.ngOnInit()
      tick()
      expect(component.activeUser).toEqual(barbieUserFixture())
    }))
    it('should fetch user feedbacks and sort them correctly', async () => {
      component.ngOnInit()
      await fixture.whenStable()
      expect(component.userFeedbacksParents.length).toBe(4)
      expect(
        component.userFeedBacksAnswers.get(someUserFeedbacksFixture()[0].uuid)
          .length
      ).toBe(2)
    })
  })

  describe('publishNewComment()', () => {
    it('should publish the new userFeedback', () => {
      const expectedNewUserFeedback: UserFeedback = {
        uuid: undefined,
        comment: 'TEST',
        metadataUUID: 'accroche_velos',
        parentUuid: null,
        published: true,
        date: expect.any(Date),
        authorUserId: activeUser.id,
        authorEmail: activeUser.email,
        authorName: `${activeUser.name} ${activeUser.surname}`,
      }

      component.newComment = 'TEST'
      component.metadataUuid = 'accroche_velos'
      fixture.detectChanges()
      component.publishNewComment()
      expect(mdViewFacadeMock.addUserFeedback).toHaveBeenCalledWith(
        expectedNewUserFeedback
      )
    })
  })
})
