import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddLayerFromCatalogComponent } from './add-layer-from-catalog.component'

describe('AddLayerFromCatalogComponent', () => {
  let component: AddLayerFromCatalogComponent
  let fixture: ComponentFixture<AddLayerFromCatalogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLayerFromCatalogComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLayerFromCatalogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
