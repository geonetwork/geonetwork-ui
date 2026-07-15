import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LightTopToolbarComponent } from './light-top-toolbar.component'
import { BehaviorSubject } from 'rxjs'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class EditorFacadeMock {
  saving$ = new BehaviorSubject(false)
  saveRecord = jest.fn()
}

describe('LightTopToolbarComponent', () => {
  let component: LightTopToolbarComponent
  let fixture: ComponentFixture<LightTopToolbarComponent>
  let editorFacade: EditorFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LightTopToolbarComponent)
    component = fixture.componentInstance
    editorFacade = TestBed.inject(EditorFacade) as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('save button', () => {
    it('calls saveRecord on the facade', () => {
      component.saveRecord()
      expect(editorFacade.saveRecord).toHaveBeenCalled()
    })
    it('disables the save and leave buttons while saving', () => {
      editorFacade.saving$.next(true)
      fixture.detectChanges()
      const saveButton = fixture.nativeElement.querySelector(
        '[data-cy="save-button"] button'
      )
      const leaveButton = fixture.nativeElement.querySelector(
        '[data-cy="leave-button"] button'
      )
      expect(saveButton.disabled).toBe(true)
      expect(leaveButton.disabled).toBe(true)
    })
    it('shows a spinner while saving', () => {
      editorFacade.saving$.next(true)
      fixture.detectChanges()
      expect(fixture.nativeElement.querySelector('mat-spinner')).toBeTruthy()
    })
  })

  describe('leave button', () => {
    it('emits leave on click', () => {
      const emitted = jest.fn()
      component.leave.subscribe(emitted)
      const leaveButton = fixture.nativeElement.querySelector(
        '[data-cy="leave-button"] button'
      )
      leaveButton.click()
      expect(emitted).toHaveBeenCalled()
    })
  })
})
