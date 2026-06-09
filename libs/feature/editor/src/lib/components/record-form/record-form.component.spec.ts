import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'
import { FormFieldComponent } from './form-field'
import { MockBuilder } from 'ng-mocks'
import {
  datasetRecordsFixture,
  editorConfigFixture,
} from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, Subject } from 'rxjs'

class EditorFacadeMock {
  record$ = new BehaviorSubject(datasetRecordsFixture()[0])
  focusedField$ = new Subject<string | null>()
  editorConfig$ = new BehaviorSubject(editorConfigFixture())
  currentPage$ = new BehaviorSubject(0)
  setCurrentPage = jest.fn()
  updateRecordField = jest.fn()
}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>
  let facade: EditorFacadeMock

  beforeEach(() => {
    return MockBuilder(RecordFormComponent).keep(FormFieldComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordFormComponent],
      providers: [{ provide: EditorFacade, useClass: EditorFacadeMock }],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade) as unknown as EditorFacadeMock
    fixture = TestBed.createComponent(RecordFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('handleFieldValueChange', () => {
    it('should call facade.updateRecordField', () => {
      component.handleFieldValueChange('title', 'new title')
      expect(facade.updateRecordField).toHaveBeenCalledWith(
        'title',
        'new title'
      )
    })
  })

  describe('getPageIndexForField', () => {
    it('should return the page index for a field present in the config', async () => {
      expect(await component.getPageIndexForField('title')).toBe(0)
    })

    it('should return null for a field not present in the config', async () => {
      expect(
        await component.getPageIndexForField('organisation' as any)
      ).toBeNull()
    })
  })

  describe('focusedField$ subscription', () => {
    beforeEach(() => {
      jest.spyOn(component, 'focusField').mockImplementation()
    })

    describe('when the focused field is on a different page', () => {
      beforeEach(async () => {
        // 'licenses' is on page 2 in editorConfigFixture
        facade.focusedField$.next('licenses')
        await fixture.whenStable()
      })

      it('should navigate to the correct page', () => {
        expect(facade.setCurrentPage).toHaveBeenCalledWith(2)
      })
    })

    describe('when the focused field is on the same page as the current page', () => {
      beforeEach(async () => {
        // 'title' is on page 0 in editorConfigFixture, and currentPage$ defaults to 0
        facade.focusedField$.next('title')
        await fixture.whenStable()
      })

      it('should not navigate to a page', () => {
        expect(facade.setCurrentPage).not.toHaveBeenCalled()
      })
    })

    describe('when the focused field is not found in the config', () => {
      beforeEach(async () => {
        facade.focusedField$.next('organisation' as any)
        await fixture.whenStable()
      })

      it('should not navigate to a page', () => {
        expect(facade.setCurrentPage).not.toHaveBeenCalled()
      })
    })
  })

  describe('subscription', () => {
    it('should add 1 subscription on init', () => {
      const addSpy = jest.spyOn(component.subscription, 'add')
      component.ngOnInit()
      expect(addSpy).toHaveBeenCalledTimes(1)
    })

    it('should unsubscribe on destroy', () => {
      const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe')
      component.ngOnDestroy()
      expect(unsubscribeSpy).toHaveBeenCalled()
    })
  })
})
