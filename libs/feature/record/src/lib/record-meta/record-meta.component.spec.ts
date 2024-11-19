import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordMetaComponent } from './record-meta.component'

describe('RecordMetaComponent', () => {
  let component: RecordMetaComponent
  let fixture: ComponentFixture<RecordMetaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RecordMetaComponent],
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
