import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RecordPageComponent } from './record-page.component.js'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SAMPLE_RECORD } from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'
import { TitleService } from '../../router/datahub-title.service.js'

describe('RecordPageComponent', () => {
  let component: RecordPageComponent
  let fixture: ComponentFixture<RecordPageComponent>

  beforeEach(() => MockBuilder(RecordPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MdViewFacade, {
          metadata$: of(SAMPLE_RECORD),
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
})
