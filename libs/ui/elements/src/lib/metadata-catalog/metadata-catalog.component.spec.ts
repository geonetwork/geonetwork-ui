import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MetadataCatalogComponent } from './metadata-catalog.component'

describe('MetadataCatalogComponent', () => {
  let component: MetadataCatalogComponent
  let fixture: ComponentFixture<MetadataCatalogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataCatalogComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataCatalogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
