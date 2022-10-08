import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GnDatasetPreviewComponent } from './gn-dataset-preview.component'

describe('GnDatasetPreviewComponent', () => {
  let component: GnDatasetPreviewComponent
  let fixture: ComponentFixture<GnDatasetPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GnDatasetPreviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GnDatasetPreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
