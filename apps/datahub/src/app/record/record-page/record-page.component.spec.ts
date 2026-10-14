import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Meta } from '@angular/platform-browser'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RecordPageComponent } from './record-page.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SAMPLE_RECORD } from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'
import { TitleService } from '../../router/datahub-title.service'

describe('RecordPageComponent', () => {
  let component: RecordPageComponent
  let fixture: ComponentFixture<RecordPageComponent>
  let error$: BehaviorSubject<{ notFound?: boolean; otherError?: string }>

  beforeEach(() => MockBuilder(RecordPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MdViewFacade, {
          metadata$: of(SAMPLE_RECORD),
          error$: of(null),
        }),
        MockProvider(TitleService),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
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
    component.ngOnInit()

    expect(titleService.setTitle).toHaveBeenCalledWith(SAMPLE_RECORD.title)
  })
  describe('robots meta tag', () => {
    let meta: Meta
    let facade: MdViewFacade
    beforeEach(() => {
      meta = TestBed.inject(Meta)
      facade = TestBed.inject(MdViewFacade)
      jest.spyOn(meta, 'updateTag')
      jest.spyOn(meta, 'removeTag')
    })
    it('adds noindex when the record is not found', () => {
      facade.error$ = of({ notFound: true })
      component.ngOnInit()
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
