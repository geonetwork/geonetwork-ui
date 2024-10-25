import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationsResultComponent } from './organisations-result.component'
import { MockBuilder } from 'ng-mocks'

describe('OrganisationsResultComponent', () => {
  let component: OrganisationsResultComponent
  let fixture: ComponentFixture<OrganisationsResultComponent>

  beforeEach(() => MockBuilder(OrganisationsResultComponent))

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsResultComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
