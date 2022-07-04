import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganisationPreviewComponent } from './organisation-preview.component'

describe('OrganisationPreviewComponent', () => {
  let component: OrganisationPreviewComponent
  let fixture: ComponentFixture<OrganisationPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationPreviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganisationPreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
