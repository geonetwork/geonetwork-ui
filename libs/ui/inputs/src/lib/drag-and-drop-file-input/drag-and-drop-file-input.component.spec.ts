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

  it('clears the selected file', () => {
    component.selectFile({
      addedFiles: [new File(['content'], 'area.geojson')],
    })
    expect(component.fileName).toBe('area.geojson')

    component.clear()

    expect(component.fileName).toBeNull()
  })

  it('emits an invalid-extension error for a rejected file type', () => {
    const errors: string[] = []
    component.errorChange.subscribe((e) => errors.push(e))

    component.selectFile({
      addedFiles: [],
      rejectedFiles: [{ reason: 'type' }],
    })

    expect(errors).toEqual(['invalid-extension'])
    expect(component.fileName).toBeNull()
  })

  it('emits a file-too-large error for a rejected file size', () => {
    const errors: string[] = []
    component.errorChange.subscribe((e) => errors.push(e))

    component.selectFile({
      addedFiles: [],
      rejectedFiles: [{ reason: 'size' }],
    })

    expect(errors).toEqual(['file-too-large'])
  })

  it('converts maxFileSizeMb to bytes', () => {
    expect(component.maxFileSizeBytes).toBeNull()

    component.maxFileSizeMb = 2
    expect(component.maxFileSizeBytes).toBe(2 * 1024 * 1024)
  })
})
