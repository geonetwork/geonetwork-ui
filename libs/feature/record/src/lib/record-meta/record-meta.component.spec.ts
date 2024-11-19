import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordMetaComponent } from './record-meta.component'

describe('ExternalViewerButtonComponent', () => {
  let component: RecordMetaComponent
  let fixture: ComponentFixture<RecordMetaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordMetaComponent],
      imports: [],
      providers: [],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMetaComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
