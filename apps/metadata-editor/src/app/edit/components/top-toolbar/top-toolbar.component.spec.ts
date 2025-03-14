import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TopToolbarComponent } from './top-toolbar.component'
import { Component } from '@angular/core'
import { PublishButtonComponent } from '../publish-button/publish-button.component'
import { BehaviorSubject } from 'rxjs'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { TranslateModule } from '@ngx-translate/core'

class EditorFacadeMock {
  changedSinceSave$ = new BehaviorSubject(false)
  isPublished$ = new BehaviorSubject(false)
}

@Component({
  selector: 'md-editor-publish-button',
  template: '',
  standalone: true,
})
class MockPublishButtonComponent {}

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent
  let fixture: ComponentFixture<TopToolbarComponent>
  let editorFacade: EditorFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopToolbarComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    })
      .overrideComponent(TopToolbarComponent, {
        add: {
          imports: [MockPublishButtonComponent],
        },
        remove: {
          imports: [PublishButtonComponent],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(TopToolbarComponent)
    component = fixture.componentInstance
    editorFacade = TestBed.inject(EditorFacade) as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('save status', () => {
    let saveStatus: string
    beforeEach(() => {
      component['saveStatus$'].subscribe((status) => {
        saveStatus = status
      })
    })
    describe('saved and not published', () => {
      beforeEach(() => {
        editorFacade.changedSinceSave$.next(false)
        editorFacade.isPublished$.next(false)
      })
      it('sets the correct status', () => {
        expect(saveStatus).toBe('record_not_published')
      })
    })
    describe('saved, published and up to date', () => {
      beforeEach(() => {
        editorFacade.changedSinceSave$.next(false)
        editorFacade.isPublished$.next(true)
      })
      it('sets the correct status', () => {
        expect(saveStatus).toBe('record_up_to_date')
      })
    })
    describe('saved, published, pending changes', () => {
      beforeEach(() => {
        editorFacade.changedSinceSave$.next(true)
        editorFacade.isPublished$.next(true)
      })
      it('sets the correct status', () => {
        expect(saveStatus).toBe('draft_changes_pending')
      })
    })
  })
})
