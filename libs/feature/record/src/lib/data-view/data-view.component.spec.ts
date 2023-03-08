import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataViewComponent } from './data-view.component'
import { TranslateModule } from '@ngx-translate/core'
import { MetadataLink, MetadataLinkType } from '@geonetwork-ui/util/shared'

const DATALINKS_FIXTURE: MetadataLink[] = [
  {
    label: 'CSV file',
    description: 'CSV file',
    name: 'some_file_name.csv',
    protocol: 'WWW:DOWNLOAD',
    url: 'https://test.org/some_file_name.csv',
    type: MetadataLinkType.DOWNLOAD,
  },
]
const GEODATALINKS_FIXTURE: MetadataLink[] = [
  {
    label: 'Geojson file',
    description: 'Geojson file',
    name: 'some_file_name.geojson',
    protocol: 'WWW:DOWNLOAD',
    url: 'https://test.org/some_file_name.geojson',
    type: MetadataLinkType.DOWNLOAD,
  },
  {
    label: 'Service WFS',
    description: 'Service WFS',
    name: 'abc:featureType',
    protocol: 'OGC:WFS',
    url: 'https://test.org/wfs',
    type: MetadataLinkType.WFS,
  },
]

class MdViewFacadeMock {
  dataLinks$ = new Subject()
  geoDataLinks$ = new Subject()
}

@Component({
  selector: 'gn-ui-table-view',
  template: '<div></div>',
})
export class MockTableViewComponent {
  @Input() link: MetadataLink
}

@Component({
  selector: 'gn-ui-dropdown-selector',
  template: '<div></div>',
})
export class MockDropdownSelectorComponent {
  @Input() choices: unknown[]
  @Input() showTitle
  @Output() selectValue = new EventEmitter()
}

describe('DataViewComponent', () => {
  let component: DataViewComponent
  let fixture: ComponentFixture<DataViewComponent>
  let facade
  let dropdownComponent: MockDropdownSelectorComponent
  let tableViewComponent: MockTableViewComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataViewComponent,
        MockTableViewComponent,
        MockDropdownSelectorComponent,
      ],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(DataViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    facade.dataLinks$.next(DATALINKS_FIXTURE)
    facade.geoDataLinks$.next(GEODATALINKS_FIXTURE)
    flushMicrotasks()
    fixture.detectChanges()

    dropdownComponent = fixture.debugElement.query(
      By.directive(MockDropdownSelectorComponent)
    ).componentInstance
    tableViewComponent = fixture.debugElement.query(
      By.directive(MockTableViewComponent)
    ).componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    describe('when component is rendered', () => {
      it('shows the dropdown with the same number of entries', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            label: 'CSV file (csv)',
            value: JSON.stringify(DATALINKS_FIXTURE[0]),
          },
          {
            label: 'Geojson file (geojson)',
            value: JSON.stringify(GEODATALINKS_FIXTURE[0]),
          },
          {
            label: 'Service WFS (WFS)',
            value: JSON.stringify(GEODATALINKS_FIXTURE[1]),
          },
        ])
      })
      it('displays link in the table', () => {
        expect(tableViewComponent.link).toEqual(DATALINKS_FIXTURE[0])
      })
    })

    describe('when switching data link', () => {
      beforeEach(fakeAsync(() => {
        dropdownComponent.selectValue.emit(
          JSON.stringify(GEODATALINKS_FIXTURE[1])
        )
        flushMicrotasks()
        fixture.detectChanges()
      }))
      it('displays link in the table', () => {
        expect(tableViewComponent.link).toEqual(GEODATALINKS_FIXTURE[1])
      })
    })
  })
})
