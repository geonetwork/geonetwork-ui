import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrganizationPreviewDatahubComponent } from './organization-preview-datahub.component'

describe('OrganizationPreviewDatahubComponent', () => {
  let component: OrganizationPreviewDatahubComponent
  let fixture: ComponentFixture<OrganizationPreviewDatahubComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationPreviewDatahubComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganizationPreviewDatahubComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
