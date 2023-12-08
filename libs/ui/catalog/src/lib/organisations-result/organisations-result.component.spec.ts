import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationsResultComponent } from './organisations-result.component'

describe('OrganisationsResultComponent', () => {
  let component: OrganisationsResultComponent
  let fixture: ComponentFixture<OrganisationsResultComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationsResultComponent],
    })
    fixture = TestBed.createComponent(OrganisationsResultComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
