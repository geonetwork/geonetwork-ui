import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'

describe('DragAndDropFileInputComponent', () => {
  let component: DragAndDropFileInputComponent
  let fixture: ComponentFixture<DragAndDropFileInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropFileInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
