import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from './results-layout.config'

import { ResultsListComponent } from './results-list.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('ResultsListComponent', () => {
  let component: ResultsListComponent
  let fixture: ComponentFixture<ResultsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultsListComponent,
        RecordPreviewListComponent,
        RecordPreviewCardComponent,
        RecordPreviewTextComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RESULTS_LAYOUT_CONFIG,
          useValue: DEFAULT_RESULTS_LAYOUT_CONFIG,
        },
      ],
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
