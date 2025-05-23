import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, of } from 'rxjs'
import { SourcesService } from '../sources/sources.service'
import { SourceLabelComponent } from './source-label.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const catalogUuid = 'x5g40aa4-867e-40b9-9c37-3cb735465935'
const label = 'some label'
const sourcesServiceMock = {
  sources$: new BehaviorSubject({}),
  sourcesUuid$: new BehaviorSubject(''),
  sourceLabel$: new BehaviorSubject(''),
  getSourceLabel: jest.fn(() => of(label)),
}
describe('SourceLabelComponent', () => {
  let component: SourceLabelComponent
  let fixture: ComponentFixture<SourceLabelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceLabelComponent],
      providers: [
        provideI18n(),
        {
          provide: SourcesService,
          useValue: sourcesServiceMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceLabelComponent)
    component = fixture.componentInstance
    component.catalogUuid = catalogUuid
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('sourceLabel', () => {
    it('should call getSourceLabel with correct uuid', () => {
      expect(sourcesServiceMock.getSourceLabel).toHaveBeenCalledWith(
        catalogUuid
      )
    })
    it('should display source label', () => {
      const debugEl = fixture.debugElement.query(By.css('div'))
      expect(debugEl.nativeElement.textContent).toEqual(label)
    })
  })
})
