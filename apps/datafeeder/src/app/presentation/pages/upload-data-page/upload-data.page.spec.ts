import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { UploadDataPageComponent } from './upload-data.page'

const routerMock = {
  navigate: jest.fn(),
}

describe('UploadDataComponent', () => {
  let component: UploadDataPageComponent
  let fixture: ComponentFixture<UploadDataPageComponent>
  const activatedRoute = { queryParams: new BehaviorSubject({}) }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDataPageComponent],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create with non error', () => {
    expect(component).toBeTruthy()
    const el: HTMLElement = fixture.nativeElement
    const errorEl = el.querySelector('gn-ui-upload-data-error-dialog')
    expect(errorEl).toBeFalsy()
  })

  it('should display error if query param', () => {
    activatedRoute.queryParams.next({ error: 'analysis' })
    fixture = TestBed.createComponent(UploadDataPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    const el: HTMLElement = fixture.nativeElement
    const errorEl = el.querySelector('gn-ui-upload-data-error-dialog')
    expect(errorEl).toBeTruthy()
  })
})
