import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationsPageComponent } from './organisations-page.component'

describe('OrganisationsPageComponent', () => {
  let component: OrganisationsPageComponent
  let fixture: ComponentFixture<OrganisationsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganisationsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
