import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PermalinkComponent } from './permalink.component'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject } from 'rxjs'
import { MdViewFacade } from '../state'

class MdViewFacadeMock {
  chartConfig$ = new BehaviorSubject({
    aggregation: 'sum',
    xProperty: 'anneeappro',
    yProperty: 'nbre_com',
    chartType: 'bar',
  })
}
class ConfigMock {
  basePath: 'http://gn-api.url/'
}
describe('PermalinkComponent', () => {
  let component: PermalinkComponent
  let fixture: ComponentFixture<PermalinkComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermalinkComponent],
      providers: [
        {
          provide: Configuration,
          useClass: ConfigMock,
        },
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(PermalinkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
