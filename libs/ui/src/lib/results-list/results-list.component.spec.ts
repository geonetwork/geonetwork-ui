import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'

import { ResultsListComponent } from './results-list.component'
import {NO_ERRORS_SCHEMA} from '@angular/core'

describe('ResultsListComponent', () => {
  let component: ResultsListComponent
  let fixture: ComponentFixture<ResultsListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsListComponent,
        RecordPreviewListComponent,
        RecordPreviewCardComponent,
        RecordPreviewTextComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
