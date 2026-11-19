import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Meta } from '@angular/platform-browser'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RecordPageComponent } from './record-page.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SAMPLE_RECORD } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BehaviorSubject } from 'rxjs'
import { TitleService } from '../../router/datahub-title.service'

class MdViewFacadeMock {
  metadata$ = new BehaviorSubject<Partial<CatalogRecord>>(SAMPLE_RECORD)
  error$ = new BehaviorSubject<{ notFound?: boolean; otherError?: string }>(
    null
  )
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
