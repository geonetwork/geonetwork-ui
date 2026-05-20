import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditorFacade } from '../../+state/editor.facade'
import { RecordFormComponent } from './record-form.component'
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
  setCurrentPage = jest.fn()
  updateRecordField = jest.fn()
}

describe('RecordFormComponent', () => {
  let component: RecordFormComponent
  let fixture: ComponentFixture<RecordFormComponent>
  let facade: EditorFacadeMock

  beforeEach(() => {
    return MockBuilder(RecordFormComponent)
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

  describe('scrollToQualityField', () => {
    let mockHostScrollIntoView: jest.Mock

    beforeEach(() => {
      mockHostScrollIntoView = jest.fn()
      component['el'].nativeElement.scrollIntoView = mockHostScrollIntoView
    })

    it('should scroll the host element into view', () => {
      component.scrollToQualityField('abstract')
      expect(mockHostScrollIntoView).toHaveBeenCalledWith({
        behavior: 'instant',
        block: 'start',
      })
    })

    it('should scroll the field element into view using anchorIdPrefix', () => {
      const mockFieldScrollIntoView = jest.fn()
      jest
        .spyOn(document, 'getElementById')
        .mockReturnValue({ scrollIntoView: mockFieldScrollIntoView } as any)

      component.scrollToQualityField('abstract')

      expect(document.getElementById).toHaveBeenCalledWith(
        component.anchorIdPrefix + 'abstract'
      )
      expect(mockFieldScrollIntoView).toHaveBeenCalledWith({
        behavior: 'instant',
        block: 'start',
      })
      jest.restoreAllMocks()
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
