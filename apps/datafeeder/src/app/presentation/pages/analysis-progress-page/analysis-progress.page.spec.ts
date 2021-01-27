import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AnalysisProgressPageComponent } from './analysis-progress.page'
import { UiModule } from '@lib/ui'
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FileUploadApiService } from '@lib/datafeeder-api'
import { of } from 'rxjs'

describe('AnalysisProgress.PageComponent', () => {
  let component: AnalysisProgressPageComponent
  let fixture: ComponentFixture<AnalysisProgressPageComponent>
  let findUploadJob = jest.fn()
  findUploadJob.mockReturnValue(of('id'))

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressPageComponent],
      imports: [UiModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FileUploadApiService,
          useValue: {
            findUploadJob,
          },
        },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisProgressPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (done) => {
    expect(component).toBeTruthy()
    setTimeout(() => {
      expect(findUploadJob).toHaveBeenCalled()
      done()
    }, 150)
  })
})
