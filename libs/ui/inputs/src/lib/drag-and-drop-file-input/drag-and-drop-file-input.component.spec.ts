import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'
import { NgxDropzoneModule } from 'ngx-dropzone'

describe('DragAndDropFileInputComponent', () => {
  let component: DragAndDropFileInputComponent
  let fixture: ComponentFixture<DragAndDropFileInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragAndDropFileInputComponent],
      imports: [NgxDropzoneModule],
    }).compileComponents()
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
