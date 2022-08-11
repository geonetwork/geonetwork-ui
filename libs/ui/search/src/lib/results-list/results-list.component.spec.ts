import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'

import { ResultsListComponent } from './results-list.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('ResultsListComponent', () => {
  let component: ResultsListComponent
  let fixture: ComponentFixture<ResultsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsListComponent, RecordPreviewCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
