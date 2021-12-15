import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'

import { SearchHeaderComponent } from './search-header.component'
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { TranslateModule } from '@ngx-translate/core'

class RouterFacadeMock {
  goToMetadata = jest.fn()
}
class SearchFacadeMock {}

describe('HeaderComponent', () => {
  let component: SearchHeaderComponent
  let fixture: ComponentFixture<SearchHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [SearchHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
