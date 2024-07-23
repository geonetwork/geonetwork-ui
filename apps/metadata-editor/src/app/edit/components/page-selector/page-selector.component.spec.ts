import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { PageSelectorComponent } from './page-selector.component'
import { EDITOR_CONFIG } from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject } from 'rxjs'
import { EditorFacade } from '@geonetwork-ui/feature/editor'

class EditorFacadeMock {
  editorConfig$ = new BehaviorSubject(EDITOR_CONFIG())
  setCurrentPage = jest.fn()
}

describe('PageSelectorComponent', () => {
  let component: PageSelectorComponent
  let fixture: ComponentFixture<PageSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(PageSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
