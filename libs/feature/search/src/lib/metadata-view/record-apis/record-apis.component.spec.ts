import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordApisComponent } from './record-apis.component'

describe('RecordApisComponent', () => {
  let component: RecordApisComponent
  let fixture: ComponentFixture<RecordApisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordApisComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordApisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
