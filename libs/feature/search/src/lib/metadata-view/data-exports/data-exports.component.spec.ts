import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'
import { BehaviorSubject } from 'rxjs'
import { MdViewFacade } from '../state'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'

import { DataExportsComponent } from './data-exports.component'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_FULL_FIXTURE[0])
  downloadLinks$ = new BehaviorSubject([
    {
      description: 'Lieu de surveillance (point)',
      name: 'surval_parametre_point',
      protocol: 'OGC:WFS',
      url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
    },
    {
      description: 'Lieu de surveillance (polygone)',
      name: 'surval_parametre_polygone',
      protocol: 'OGC:WFS',
      url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
    },
  ])
}

describe('DataExportsComponent', () => {
  let component: DataExportsComponent
  let fixture: ComponentFixture<DataExportsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExportsComponent],
      imports: [UiElementsModule],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExportsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
