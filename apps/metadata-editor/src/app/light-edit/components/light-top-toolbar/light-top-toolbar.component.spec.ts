import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { LightTopToolbarComponent } from './light-top-toolbar.component'
import { BehaviorSubject } from 'rxjs'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class EditorFacadeMock {
  saving$ = new BehaviorSubject(false)
  saveRecord = jest.fn()
}

let queryParams: Record<string, string> = {}

const getRoute = () => ({
  snapshot: {
    queryParamMap: {
      get: (key: string) => queryParams[key] ?? null,
    },
  },
})

describe('LightTopToolbarComponent', () => {
  let component: LightTopToolbarComponent
  let fixture: ComponentFixture<LightTopToolbarComponent>
  let editorFacade: EditorFacadeMock

  beforeEach(async () => {
    queryParams = {
      redirect_on_leave: 'https://example.com/datahub/reuse/1234',
    }
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
        {
          provide: ActivatedRoute,
          useFactory: getRoute,
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
    let windowOpenSpy: jest.SpyInstance
    beforeEach(() => {
      windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
    })
    afterEach(() => {
      windowOpenSpy.mockRestore()
    })

    it('opens the redirect_on_leave url in the same tab on click', () => {
      const leaveButton = fixture.nativeElement.querySelector(
        '[data-cy="leave-button"] button'
      )
      leaveButton.click()
      expect(windowOpenSpy).toHaveBeenCalledWith(
        'https://example.com/datahub/reuse/1234',
        '_self'
      )
    })
    it('is not displayed when the redirect param is absent', () => {
      queryParams = {}
      fixture = TestBed.createComponent(LightTopToolbarComponent)
      fixture.detectChanges()
      expect(
        fixture.nativeElement.querySelector('[data-cy="leave-button"]')
      ).toBeFalsy()
    })
    it('is not displayed when the redirect param is not an http(s) url', () => {
      queryParams = { redirect_on_leave: 'javascript:alert(1)' }
      fixture = TestBed.createComponent(LightTopToolbarComponent)
      fixture.detectChanges()
      expect(
        fixture.nativeElement.querySelector('[data-cy="leave-button"]')
      ).toBeFalsy()
    })
    it('does not open a window when there is no usable redirect', () => {
      queryParams = {}
      fixture = TestBed.createComponent(LightTopToolbarComponent)
      fixture.componentInstance.leave()
      expect(windowOpenSpy).not.toHaveBeenCalled()
    })
  })
})
