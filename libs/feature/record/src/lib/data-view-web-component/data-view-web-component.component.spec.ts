import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataViewWebComponentComponent } from './data-view-web-component.component'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { MdViewFacade } from '../state'
import { TranslateModule } from '@ngx-translate/core'
import { Component, Input } from '@angular/core'

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
  uniqueIdentifier: 'md_record_1234',
}

class MdViewFacadeMock {
  chartConfig$ = new BehaviorSubject(chartConfig1)
  metadata$ = new BehaviorSubject(metadata)
}
class ConfigMock {
  basePath: 'http://gn-api.url/'
}

@Component({
  selector: 'gn-ui-copy-text-button',
  template: '<div></div>',
})
export class MockCopyTextButtonComponent {
  @Input() text: string
  @Input() tooltipText: string
  @Input() rows: number
}

describe('DataViewWebComponentComponent', () => {
  let component: DataViewWebComponentComponent
  let fixture: ComponentFixture<DataViewWebComponentComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataViewWebComponentComponent,
        MockCopyTextButtonComponent,
      ],
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
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    fixture = TestBed.createComponent(DataViewWebComponentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('init webComponentHtml$', () => {
    it('should generate HTML based on configs', async () => {
      const html = await firstValueFrom(component.webComponentHtml$)
      expect(html).toBe(
        `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist/gn-wc.js"></script>
<gn-dataset-view-chart
        api-url="http://localhost/undefined"
        dataset-id="${metadata.uniqueIdentifier}"
        aggregation="${chartConfig1.aggregation}"
        x-property="${chartConfig1.xProperty}"
        y-property="${chartConfig1.yProperty}"
        chart-type="${chartConfig1.chartType}"
        primary-color="#0f4395"
        secondary-color="#8bc832"
        main-color="#555"
        background-color="#fdfbff"
        main-font="'Inter', sans-serif"
        title-font="'DM Serif Display', serif"
></gn-dataset-view-chart>`
      )
    })
  })
  describe('update webComponentHtml$', () => {
    beforeEach(() => {
      facade.chartConfig$.next(chartConfig2)
    })
    it('should update HTML based on configs', async () => {
      const html = await firstValueFrom(component.webComponentHtml$)
      expect(html).toBe(
        `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist/gn-wc.js"></script>
<gn-dataset-view-chart
        api-url="http://localhost/undefined"
        dataset-id="${metadata.uniqueIdentifier}"
        aggregation="${chartConfig2.aggregation}"
        x-property="${chartConfig2.xProperty}"
        y-property="${chartConfig2.yProperty}"
        chart-type="${chartConfig2.chartType}"
        primary-color="#0f4395"
        secondary-color="#8bc832"
        main-color="#555"
        background-color="#fdfbff"
        main-font="'Inter', sans-serif"
        title-font="'DM Serif Display', serif"
></gn-dataset-view-chart>`
      )
    })
  })
})
