import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationPreviewComponent } from './organisation-preview.component'
import { MockBuilder } from 'ng-mocks'

const organisationMock = {
  name: 'my org',
  description: 'not much',
  logoUrl: new URL('https://mygreatlogo.org'),
  recordCount: 10,
}

describe('OrganisationPreviewComponent', () => {
  let component: OrganisationPreviewComponent
  let fixture: ComponentFixture<OrganisationPreviewComponent>

  beforeEach(() => MockBuilder(OrganisationPreviewComponent))

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationPreviewComponent)
    component = fixture.componentInstance
    component.organization = organisationMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
