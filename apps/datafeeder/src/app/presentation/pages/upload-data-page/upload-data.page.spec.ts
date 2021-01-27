import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { BehaviorSubject, of } from 'rxjs'
import { UploadDataPageComponent } from './upload-data.page'

describe('UploadDataComponent', () => {
  let component: UploadDataPageComponent
  let fixture: ComponentFixture<UploadDataPageComponent>
  let activatedRoute = { queryParams: new BehaviorSubject({}) }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataPageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create with non error', () => {
    expect(component).toBeTruthy()
    const el: HTMLElement = fixture.nativeElement
    const errorEl = el.querySelector('app-upload-data-error-dialog')
    expect(errorEl).toBeFalsy()
  })

  it('should display error if query param', () => {
    activatedRoute.queryParams.next({ error: 'analysis' })
    fixture = TestBed.createComponent(UploadDataPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    const el: HTMLElement = fixture.nativeElement
    const errorEl = el.querySelector('app-upload-data-error-dialog')
    expect(errorEl).toBeTruthy()
  })
})
