import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs'
import { MetadataQualityComponent } from './metadata-quality.component.js'
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
})
