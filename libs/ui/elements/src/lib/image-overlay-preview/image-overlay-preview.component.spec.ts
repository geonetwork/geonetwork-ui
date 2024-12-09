import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImageOverlayPreviewComponent } from './image-overlay-preview.component'

describe('ImageOverlayPreviewComponent', () => {
  let component: ImageOverlayPreviewComponent
  let fixture: ComponentFixture<ImageOverlayPreviewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageOverlayPreviewComponent],
    })
    fixture = TestBed.createComponent(ImageOverlayPreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
