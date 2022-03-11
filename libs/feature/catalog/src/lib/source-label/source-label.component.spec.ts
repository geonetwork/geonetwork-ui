import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { SourcesService } from '../sources/sources.service'
import { SourceLabelComponent } from './source-label.component'

const catalogUuid = 'x5g40aa4-867e-40b9-9c37-3cb735465935'
const sourcesServiceMock = {
  sources$: new BehaviorSubject({}),
  sourcesUuid$: new BehaviorSubject(''),
  sourceLabel$: new BehaviorSubject(''),
  setSourceUuid: jest.fn(),
}
describe('SourceLabelComponent', () => {
  let component: SourceLabelComponent
  let fixture: ComponentFixture<SourceLabelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceLabelComponent],
      imports: [TranslateModule.forRoot(), HttpClientModule],
      providers: [
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
  it('should call setSourceUuid with correct uuid', () => {
    expect(sourcesServiceMock.setSourceUuid).toHaveBeenCalledWith(catalogUuid)
  })
})
