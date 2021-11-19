import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { AppComponent } from './app.component'
import { of } from 'rxjs'

class MdViewFacadeMock {
  close = jest.fn()
  isPresent$ = of()
  isLoading$ = of()
  metadata$ = of()
}
class RouterFacadeMock {
  goToMetadata = jest.fn()
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
