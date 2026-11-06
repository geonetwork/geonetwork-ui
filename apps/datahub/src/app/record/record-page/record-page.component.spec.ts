import { Location } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Meta } from '@angular/platform-browser'
import {
  ActivatedRoute,
  NavigationEnd,
  provideRouter,
  Router,
  UrlSegment,
} from '@angular/router'
import { RouterTestingHarness } from '@angular/router/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RecordPageComponent } from './record-page.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SAMPLE_RECORD } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs'
import { TitleService } from '../../router/datahub-title.service'

class RouterMock {
  navigate = jest.fn(() => Promise.resolve(true))
}

class MdViewFacadeMock {
  metadata$ = new BehaviorSubject<Partial<CatalogRecord>>(SAMPLE_RECORD)
  error$ = new BehaviorSubject<{ notFound?: boolean; otherError?: string }>(
    null
  )
}

class ActivatedRouteMock {
  snapshot = {
    params: { metadataUuid: SAMPLE_RECORD.uniqueIdentifier },
    url: [
      new UrlSegment('dataset', {}),
      new UrlSegment(SAMPLE_RECORD.uniqueIdentifier, {}),
    ],
  }
}

describe('RecordPageComponent', () => {
  let component: RecordPageComponent
  let fixture: ComponentFixture<RecordPageComponent>
  let facade: MdViewFacadeMock

  beforeEach(() => MockBuilder(RecordPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MdViewFacade, MdViewFacadeMock, 'useClass'),
        MockProvider(TitleService),
        { provide: Router, useClass: RouterMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    facade = TestBed.inject(MdViewFacade) as unknown as MdViewFacadeMock
    fixture = TestBed.createComponent(RecordPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('has id="record-page" at root for related records scroll', () => {
    expect(fixture.nativeElement.children[0].id).toBe('record-page')
  })
  it('should set the page title', () => {
    const titleService = TestBed.inject(TitleService)

    jest.spyOn(titleService, 'setTitle')
    facade.metadata$.next({ ...SAMPLE_RECORD })

    expect(titleService.setTitle).toHaveBeenCalledWith(SAMPLE_RECORD.title)
  })
  describe('record URL', () => {
    it.each([
      ['dataset', 'service'],
      ['dataset', 'reuse'],
      ['service', 'reuse'],
      ['service', 'dataset'],
      ['reuse', 'dataset'],
      ['reuse', 'service'],
    ] as const)('corrects a %s URL for a %s record', (path, kind) => {
      const route = TestBed.inject(ActivatedRoute)
      route.snapshot.url[0] = new UrlSegment(path, {})
      facade.metadata$.next({
        uniqueIdentifier: SAMPLE_RECORD.uniqueIdentifier,
        title: SAMPLE_RECORD.title,
        kind,
      })

      expect(TestBed.inject(Router).navigate).toHaveBeenCalledTimes(1)
      expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(
        ['/', kind, SAMPLE_RECORD.uniqueIdentifier],
        {
          queryParamsHandling: 'preserve',
          preserveFragment: true,
          replaceUrl: true,
        }
      )
    })

    it.each(['dataset', 'service', 'reuse'] as const)(
      'does not navigate when the URL already matches a %s record',
      (kind) => {
        TestBed.inject(ActivatedRoute).snapshot.url[0] = new UrlSegment(
          kind,
          {}
        )
        facade.metadata$.next({
          uniqueIdentifier: SAMPLE_RECORD.uniqueIdentifier,
          title: SAMPLE_RECORD.title,
          kind,
        })

        expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled()
      }
    )

    it('does not change the URL using metadata from a previous record', () => {
      facade.metadata$.next({
        uniqueIdentifier: 'previous-record',
        title: SAMPLE_RECORD.title,
        kind: 'service',
      })

      expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled()
    })

    it('does not navigate for an incomplete record without a kind', () => {
      facade.metadata$.next({
        uniqueIdentifier: SAMPLE_RECORD.uniqueIdentifier,
        title: '',
      })

      expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled()
    })

    it('stops correcting the URL once navigation completes', () => {
      facade.metadata$.next({
        uniqueIdentifier: SAMPLE_RECORD.uniqueIdentifier,
        title: SAMPLE_RECORD.title,
        kind: 'service' as const,
      })
      TestBed.inject(ActivatedRoute).snapshot.url[0] = new UrlSegment(
        'service',
        {}
      )

      facade.metadata$.next({ ...facade.metadata$.value })

      expect(TestBed.inject(Router).navigate).toHaveBeenCalledTimes(1)
    })
  })
  describe('robots meta tag', () => {
    let meta: Meta
    beforeEach(() => {
      meta = TestBed.inject(Meta)
      jest.spyOn(meta, 'updateTag')
      jest.spyOn(meta, 'removeTag')
    })
    it('adds noindex when the record is not found', () => {
      facade.error$.next({ notFound: true })
      expect(meta.updateTag).toHaveBeenCalledWith({
        name: 'robots',
        content: 'noindex',
      })
    })
    it('removes the tag on destroy', () => {
      fixture.destroy()
      expect(meta.removeTag).toHaveBeenCalledWith('name="robots"')
    })
  })
})

describe('RecordPageComponent routing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordPageComponent],
      providers: [
        provideRouter(
          ['dataset', 'service', 'reuse'].map((kind) => ({
            path: `${kind}/:metadataUuid`,
            component: RecordPageComponent,
          }))
        ),
        MockProvider(MdViewFacade, MdViewFacadeMock, 'useClass'),
        MockProvider(TitleService),
      ],
    })
      .overrideComponent(RecordPageComponent, {
        set: { template: '', imports: [] },
      })
      .compileComponents()
  })

  it.each(['service', 'reuse'] as const)(
    'corrects a dataset URL for a %s while preserving its query and fragment',
    async (kind) => {
      const uuid = SAMPLE_RECORD.uniqueIdentifier
      const router = TestBed.inject(Router)
      const harness = await RouterTestingHarness.create(
        `/dataset/${uuid}?test=value#details`
      )
      const replaceState = jest.spyOn(TestBed.inject(Location), 'replaceState')
      const navigation = firstValueFrom(
        router.events.pipe(filter((event) => event instanceof NavigationEnd))
      )
      const facade = TestBed.inject(MdViewFacade) as unknown as MdViewFacadeMock

      facade.metadata$.next({
        uniqueIdentifier: uuid,
        title: SAMPLE_RECORD.title,
        kind,
      })
      await navigation
      harness.detectChanges()

      expect(router.url).toBe(`/${kind}/${uuid}?test=value#details`)
      expect(replaceState).toHaveBeenCalledWith(
        `/${kind}/${uuid}?test=value#details`,
        '',
        expect.any(Object)
      )
    }
  )
})
