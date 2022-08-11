import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'
import { DEFAULT_RESULTS_LAYOUT_CONFIG } from '../results-list/results-layout.config'

import { ResultsListItemComponent } from './results-list-item.component'

describe('ResultsListItemComponent', () => {
  let component: ResultsListItemComponent
  let fixture: ComponentFixture<ResultsListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsListItemComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListItemComponent)
    component = fixture.componentInstance
    component.layoutConfig = DEFAULT_RESULTS_LAYOUT_CONFIG['CARD']
    component.record = {
      id: '139',
      uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: 'Abcd',
      metadataUrl: '/abcd.html',
      thumbnailUrl: '/abcd.jpg',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('dynamic rendering', () => {
    describe('on loading', () => {
      it('CARD instance', () => {
        const recordPreviewComponent = fixture.debugElement.query(
          By.directive(RecordPreviewCardComponent)
        ).componentInstance

        expect(recordPreviewComponent).toBeTruthy()
      })
    })
    describe('after layout change', () => {
      beforeEach(() => {
        component.layoutConfig = DEFAULT_RESULTS_LAYOUT_CONFIG['TEXT']
        fixture.detectChanges()
        component.ngOnChanges()
      })
      it('TEXT instance', () => {
        const recordPreviewComponent = fixture.debugElement.query(
          By.directive(RecordPreviewTextComponent)
        ).componentInstance

        expect(recordPreviewComponent).toBeTruthy()
      })
    })
  })
})
