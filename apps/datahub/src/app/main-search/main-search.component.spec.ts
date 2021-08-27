import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainSearchComponent } from './main-search.component'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

class MdViewFacadeMock {
  setIncompleteMetadata = jest.fn()
}

describe('MainSearchComponent', () => {
  let component: MainSearchComponent
  let fixture: ComponentFixture<MainSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSearchComponent],
      imports: [UiLayoutModule],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
