import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImageInputComponent } from './image-input.component'

describe('ImageInputComponent', () => {
  let component: ImageInputComponent
  let fixture: ComponentFixture<ImageInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageInputComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
