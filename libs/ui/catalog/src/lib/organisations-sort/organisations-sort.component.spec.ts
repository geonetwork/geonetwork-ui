import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganisationsSortComponent } from './organisations-sort.component'

describe('OrganisationsOrderComponent', () => {
  let component: OrganisationsSortComponent
  let fixture: ComponentFixture<OrganisationsSortComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationsSortComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganisationsSortComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
