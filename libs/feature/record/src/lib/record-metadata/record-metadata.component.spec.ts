import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordMetadataComponent } from './record-metadata.component'

describe('RecordMetadataComponent', () => {
  let component: RecordMetadataComponent
  let fixture: ComponentFixture<RecordMetadataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordMetadataComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMetadataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
