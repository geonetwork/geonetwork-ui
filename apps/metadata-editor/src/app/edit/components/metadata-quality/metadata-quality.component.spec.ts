import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs'
import { By } from '@angular/platform-browser'
import { MetadataQualityComponent } from './metadata-quality.component'
import { EditorFacade } from '@geonetwork-ui/feature/editor'

class EditorFacadeMock {
  record$ = new BehaviorSubject({
    otherLanguages: [],
  })
}

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>
  let editorFacade: EditorFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MetadataQualityComponent)
    component = fixture.componentInstance
    editorFacade = TestBed.inject(EditorFacade) as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with default propsToValidate', () => {
    expect(component.propsToValidate).toEqual([
      'title',
      'abstract',
      'keywords',
      'legalConstraints',
      'contacts',
      'organisation',
      'updateFrequency',
      'topics',
    ])
  })

  it('should pass correct inputs to gn-ui-metadata-quality', () => {
    const uiComponent = fixture.debugElement.query(
      By.css('gn-ui-metadata-quality')
    ).componentInstance

    expect(uiComponent.metadataQualityDisplay).toBe(true)
    expect(uiComponent.popoverDisplay).toBe(false)
    expect(uiComponent.propsToValidate).toEqual(component.propsToValidate)
  })
})
