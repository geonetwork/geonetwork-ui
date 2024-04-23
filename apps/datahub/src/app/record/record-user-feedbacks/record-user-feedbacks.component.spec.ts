import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { RecordUserFeedbacksComponent } from './record-user-feedbacks.component'
import { TranslateModule } from '@ngx-translate/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject, of, Subject } from 'rxjs'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  DATASET_RECORDS,
  SOME_USER_FEEDBACKS,
  A_USER,
} from '@geonetwork-ui/common/fixtures'
import { UserFeedbackViewModel } from '@geonetwork-ui/common/domain/model/record'

describe('RelatedRecordsComponent', () => {
  const allUserFeedbacks = SOME_USER_FEEDBACKS
  let mockDestroy$: Subject<void>

  const mdViewFacadeMock: Partial<MdViewFacade> = {
    isAllUserFeedbackLoading$: new BehaviorSubject(false),
    isAddUserFeedbackLoading$: new BehaviorSubject(false),
    loadUserFeedbacks: jest.fn(),
    userFeedbacks$: of(allUserFeedbacks),
    createUserFeedbackViewModel: (baseUserFeedback) => {
      return Promise.resolve({
        ...baseUserFeedback,
        avatarUrl: 'someAvatarUrl',
      } as UserFeedbackViewModel)
    },
  }

  const changeDetectorRefMock: Partial<ChangeDetectorRef> = {
    markForCheck: jest.fn(),
  }

  const platformServiceInterfaceMock: Partial<PlatformServiceInterface> = {
    getUserFeedbacks: jest.fn(),
    getMe: jest.fn(() => new BehaviorSubject(A_USER)),
  }

  let component: RecordUserFeedbacksComponent
  let fixture: ComponentFixture<RecordUserFeedbacksComponent>

  beforeEach(async () => {
    mockDestroy$ = new Subject()

    await TestBed.configureTestingModule({
      declarations: [RecordUserFeedbacksComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MdViewFacade,
          useValue: mdViewFacadeMock,
        },
        {
          provide: ChangeDetectorRef,
          useValue: changeDetectorRefMock,
        },
        {
          provide: PlatformServiceInterface,
          useValue: platformServiceInterfaceMock,
        },
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
    component.metadataUuid = DATASET_RECORDS[0].uniqueIdentifier

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
        DATASET_RECORDS[0].uniqueIdentifier
      )
    })
    it('should set active user', fakeAsync(() => {
      component.ngOnInit()
      tick()
      expect(component.activeUser).toEqual(A_USER)
    }))
    it('should fetch user feedbacks and sort them correctly', async () => {
      component.ngOnInit()
      await fixture.whenStable()
      expect(component.userFeedbacksParents.length).toBe(4)
      expect(
        component.userFeedBacksAnswers.get(SOME_USER_FEEDBACKS[0].uuid).length
      ).toBe(2)
    })
  })
})
