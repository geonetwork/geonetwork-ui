import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataFullViewComponent } from './metadata-full-view.component'
import { MdViewFacade } from '../state/mdview.facade'
import { BehaviorSubject } from 'rxjs'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/ui/search'
import { By } from '@angular/platform-browser'
import { MetadataPageComponent, UiLayoutModule } from '@geonetwork-ui/ui/layout'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_SUMMARY_FIXTURE[0])
}

describe('MetadataFullViewComponent', () => {
  let component: MetadataFullViewComponent
  let fixture: ComponentFixture<MetadataFullViewComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataFullViewComponent],
      imports: [UiLayoutModule],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataFullViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('if metadata present', () => {
    beforeEach(() => {
      facade.isPresent$.next(true)
      fixture.detectChanges()
    })
    it('shows the full metadata', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataPageComponent)
      ).componentInstance
      expect(dumb.metadata).toHaveProperty('abstract')
    })
  })
  describe('if metadata not present', () => {
    beforeEach(() => {
      facade.isPresent$.next(false)
      fixture.detectChanges()
    })
    it('shows a placeholder', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataPageComponent)
      ).componentInstance
      expect(dumb.metadata).not.toHaveProperty('abstract')
      expect(dumb.incomplete).toBeTruthy()
    })
  })
})
