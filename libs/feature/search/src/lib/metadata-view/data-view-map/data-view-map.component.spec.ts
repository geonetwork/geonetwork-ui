import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MapContextModel } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { Subject } from 'rxjs'

import { DataViewMapComponent } from './data-view-map.component'

class MdViewFacadeMock {
  mapApiLinks$ = new Subject()
}

@Component({
  selector: 'gn-ui-map-context',
  template: '<div></div>',
})
export class MockMapContextComponent {
  @Input() context: MapContextModel
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

describe('DataViewMapComponent', () => {
  let component: DataViewMapComponent
  let fixture: ComponentFixture<DataViewMapComponent>
  let mdViewFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataViewMapComponent,
        MockMapContextComponent,
        MockDropdownSelectorComponent,
      ],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    mdViewFacade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewMapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('map layers', () => {
    let mapComponent: MockMapContextComponent
    let dropdownComponent: DropdownSelectorComponent

    beforeEach(() => {
      mapComponent = fixture.debugElement.query(
        By.directive(MockMapContextComponent)
      ).componentInstance
      dropdownComponent = fixture.debugElement.query(
        By.directive(MockDropdownSelectorComponent)
      ).componentInstance
    })

    describe('with no link compatible with MAP usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with only the base layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [component.getBackgroundLayer()],
          view: expect.any(Object),
        })
      })
      it('provides a placeholder value to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: expect.any(String),
          },
        ])
      })
    })

    describe('with several links compatible with MAP usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer1',
            protocol: 'OGC:WMS',
          },
          {
            url: 'http://abcd.com/',
            name: 'layer2',
            protocol: 'OGC:WMS',
          },
        ])
        fixture.detectChanges()
      })
      it('emits a map context with the base layer and the first compatible link', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              url: 'http://abcd.com/',
              name: 'layer1',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
      it('provides a list of links to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: 'layer1 (OGC:WMS)',
          },
          {
            value: 1,
            label: 'layer2 (OGC:WMS)',
          },
        ])
      })
    })

    describe('when receiving several metadata records', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer',
            protocol: 'OGC:WMS',
          },
        ])
        fixture.detectChanges()
      })
      it('emits a map context with the link from the last record', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              url: 'http://abcd.com/',
              name: 'layer',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
      it('provides a list of links to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: 'layer (OGC:WMS)',
          },
        ])
      })
    })

    describe('when selecting a layer', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer1',
            protocol: 'OGC:WMS',
          },
          {
            url: 'http://abcd.com/',
            name: 'layer2',
            protocol: 'OGC:WMS',
          },
        ])
        dropdownComponent.selectValue.emit(1)
        fixture.detectChanges()
      })
      it('emits a new map context with the selected layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              url: 'http://abcd.com/',
              name: 'layer2',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
    })
  })
})
