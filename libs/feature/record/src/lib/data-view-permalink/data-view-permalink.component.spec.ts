import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  DataViewPermalinkComponent,
  WEB_COMPONENT_EMBEDDER_URL,
} from './data-view-permalink.component'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { MdViewFacade } from '../state'
import { Component, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

const chartConfig1 = {
  aggregation: 'sum',
  xProperty: 'anneeappro',
  yProperty: 'nbre_com',
  chartType: 'bar',
}

const chartConfig2 = {
  aggregation: 'min',
  xProperty: 'pro',
  yProperty: 'number',
  chartType: 'line',
}

const metadata = {
  uuid: 'md_record_1234',
}

class MdViewFacadeMock {
  chartConfig$ = new BehaviorSubject(chartConfig1)
  metadata$ = new BehaviorSubject(metadata)
}
class ConfigMock {
  basePath: 'http://gn-api.url/'
}

const baseUrl = 'https://example.com/wc-embedder'

@Component({
  selector: 'gn-ui-copy-text-button',
  template: '<div></div>',
})
export class MockCopyTextButtonComponent {
  @Input() text: string
  @Input() tooltipText: string
}
describe('DataViewPermalinkComponent', () => {
  let component: DataViewPermalinkComponent
  let fixture: ComponentFixture<DataViewPermalinkComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataViewPermalinkComponent, MockCopyTextButtonComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: Configuration,
          useClass: ConfigMock,
        },
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: WEB_COMPONENT_EMBEDDER_URL,
          useValue: baseUrl,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    fixture = TestBed.createComponent(DataViewPermalinkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('init permalinkUrl$', () => {
    it('should generate URL based on configs', async () => {
      const url = await firstValueFrom(component.permalinkUrl$)
      expect(url).toBe(
        `https://example.com/wc-embedder?e=gn-dataset-view-chart&a=api-url=${component.config.basePath}&a=dataset-id=${metadata.uuid}&a=primary-color=%230f4395&a=secondary-color=%238bc832&a=main-color=%23555&a=background-color=%23fdfbff&a=aggregation=${chartConfig1.aggregation}&a=x-property=${chartConfig1.xProperty}&a=y-property=${chartConfig1.yProperty}&a=chart-type=${chartConfig1.chartType}`
      )
    })
  })
  describe('update permalinkUrl$', () => {
    beforeEach(() => {
      facade.chartConfig$.next(chartConfig2)
    })
    it('should update URL based on configs', async () => {
      const url = await firstValueFrom(component.permalinkUrl$)
      expect(url).toBe(
        `https://example.com/wc-embedder?e=gn-dataset-view-chart&a=api-url=${component.config.basePath}&a=dataset-id=${metadata.uuid}&a=primary-color=%230f4395&a=secondary-color=%238bc832&a=main-color=%23555&a=background-color=%23fdfbff&a=aggregation=${chartConfig2.aggregation}&a=x-property=${chartConfig2.xProperty}&a=y-property=${chartConfig2.yProperty}&a=chart-type=${chartConfig2.chartType}`
      )
    })
  })
})
