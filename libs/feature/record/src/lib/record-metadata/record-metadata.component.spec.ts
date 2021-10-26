import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MapManagerService } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import {
  MetadataInfoComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/ui/search'
import { BehaviorSubject, Subject } from 'rxjs'
import { RecordMetadataComponent } from './record-metadata.component'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_SUMMARY_FIXTURE[0])
  mapApiLinks$ = new Subject()
  dataLinks$ = new Subject()
}

describe('RecordMetadataComponent', () => {
  let component: RecordMetadataComponent
  let fixture: ComponentFixture<RecordMetadataComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordMetadataComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [UiElementsModule],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: MapManagerService,
          useValue: {},
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMetadataComponent)
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
  describe('Map', () => {
    let mapTab
    describe('when no MAPAPI link', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(null)
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.css('mat-tab'))[2]
      })
      it('map tab is disabled', () => {
        expect(mapTab.nativeNode.disabled).toBe(true)
      })
    })
    describe('when a MAPAPI link present', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.css('mat-tab'))[2]
      })
      it('map tab is enabled', () => {
        expect(mapTab.nativeNode.disabled).toBe(false)
      })
    })
  })
})
