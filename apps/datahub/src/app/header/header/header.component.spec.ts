import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderComponent } from './header.component'
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'

class RouterFacadeMock {
  goToMetadata = jest.fn()
}

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
