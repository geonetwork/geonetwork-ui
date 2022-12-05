import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordOutputXmlComponent } from './record-output-xml.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RecordOutputXmlComponent', () => {
  let component: RecordOutputXmlComponent
  let fixture: ComponentFixture<RecordOutputXmlComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordOutputXmlComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordOutputXmlComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
