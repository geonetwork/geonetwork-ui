import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state'

import { DataApisComponent } from './data-apis.component'

class MdViewFacadeMock {
  apiLinks$ = new Subject()
}

@Component({
  selector: 'gn-ui-apis-list',
  template: '<div></div>',
})
export class MockApisListComponent {
  @Input() links: MetadataLink[]
}

describe('DataApisComponent', () => {
  let component: DataApisComponent
  let fixture: ComponentFixture<DataApisComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataApisComponent, MockApisListComponent],
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
    fixture = TestBed.createComponent(DataApisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('api links', () => {
    let apiListComponent: MockApisListComponent

    beforeEach(() => {
      apiListComponent = fixture.debugElement.query(
        By.directive(MockApisListComponent)
      ).componentInstance
    })

    describe('with no link compatible with API usage', () => {
      beforeEach(() => {
        facade.apiLinks$.next([])
        fixture.detectChanges()
      })
      it('emits no links', () => {
        expect(apiListComponent.links).toEqual([])
      })
    })

    describe('with links compatible with API usage', () => {
      beforeEach(() => {
        facade.apiLinks$.next([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone',
            protocol: 'OGC:WMS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
        ])
        fixture.detectChanges()
      })
      it('emits api links', () => {
        expect(apiListComponent.links).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone',
            protocol: 'OGC:WMS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
        ])
      })
    })
  })
})
