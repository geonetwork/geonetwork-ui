import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordFormComponent } from './record-form.component'
import { EditorService } from '../services/editor.service'

class EditorServiceMock {}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordFormComponent],
      providers: [
        {
          provide: EditorService,
          useClass: EditorServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
