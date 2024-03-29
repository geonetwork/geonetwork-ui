import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PublishButtonComponent } from './publish-button.component'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

class EditorFacadeMock {
  changedSinceSave$ = new BehaviorSubject(false)
  saving$ = new BehaviorSubject(false)
  saveRecord = jest.fn()
}

describe('PublishButtonComponent', () => {
  let component: PublishButtonComponent
  let fixture: ComponentFixture<PublishButtonComponent>
  let facade: EditorFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishButtonComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade) as any
    fixture = TestBed.createComponent(PublishButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('status$', () => {
    describe('saving', () => {
      beforeEach(() => {
        facade.saving$.next(true)
      })
      it('should return "saving" when saving', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe('saving')
      })
    })
    describe('has changes', () => {
      beforeEach(() => {
        facade.changedSinceSave$.next(true)
      })
      it('should return "hasChanges" when not saving and changed', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'hasChanges'
        )
      })
    })
    describe('up to date', () => {
      it('should return "upToDate" when not saving and not changed', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'upToDate'
        )
      })
    })
  })

  describe('#saveRecord', () => {
    beforeEach(() => {
      component.saveRecord()
    })
    it('should call facade.saveRecord', () => {
      expect(facade.saveRecord).toHaveBeenCalled()
    })
  })
})
