import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import {
  MetadataInfoComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import {
  RECORDS_FULL_FIXTURE,
  RECORDS_SUMMARY_FIXTURE,
} from '@geonetwork-ui/ui/search'
import { BehaviorSubject } from 'rxjs'

import { RecordViewComponent } from './record-view.component'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_SUMMARY_FIXTURE[0])
}

describe('DatasetViewComponent', () => {
  let component: RecordViewComponent
  let fixture: ComponentFixture<RecordViewComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [UiElementsModule],
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
    fixture = TestBed.createComponent(RecordViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('if metadata present', () => {
    beforeEach(() => {
      facade.isPresent$.next(true)
      fixture.detectChanges()
    })
    it('shows the full metadata', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataInfoComponent)
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
        By.directive(MetadataInfoComponent)
      ).componentInstance
      expect(dumb.metadata).not.toHaveProperty('abstract')
      expect(dumb.incomplete).toBeTruthy()
    })
  })
})
