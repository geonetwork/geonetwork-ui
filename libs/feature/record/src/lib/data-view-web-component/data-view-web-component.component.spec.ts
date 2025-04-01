import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataViewWebComponentComponent } from './data-view-web-component.component'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { MdViewFacade } from '../state'
import { provideRepositoryUrl } from '@geonetwork-ui/api/repository'
import { MockBuilder } from 'ng-mocks'

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

jest.mock('@geonetwork-ui/util/shared', () => {
  const originalModule = jest.requireActual('@geonetwork-ui/util/shared')
  return {
    ...originalModule,
    GEONETWORK_UI_TAG_NAME: 'v1.2.3',
  }
})

class MdViewFacadeMock {
  chartConfig$ = new BehaviorSubject(chartConfig1)
  metadata$ = new BehaviorSubject(metadata)
}

describe('DataViewWebComponentComponent', () => {
  let component: DataViewWebComponentComponent
  let fixture: ComponentFixture<DataViewWebComponentComponent>
  let facade

  beforeEach(() => MockBuilder(DataViewWebComponentComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRepositoryUrl('http://gn-api.url/'),
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    fixture = TestBed.createComponent(DataViewWebComponentComponent)
    component = fixture.componentInstance
    component.viewType$.next('chart')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Chart view', () => {
    describe('init webComponentHtml$', () => {
      it('should generate HTML based on configs', async () => {
        const html = await firstValueFrom(component.webComponentHtml$)
        expect(html).toBe(
          `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v1.2.3/gn-wc.js"></script>
  <gn-dataset-view-chart
          api-url="http://gn-api.url/"
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
          `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v1.2.3/gn-wc.js"></script>
  <gn-dataset-view-chart
          api-url="http://gn-api.url/"
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
  describe('Map view', () => {
    beforeEach(() => {
      component.viewType$.next('map')
    })
    describe('init webComponentHtml$', () => {
      it('should generate HTML based on configs', async () => {
        const html = await firstValueFrom(component.webComponentHtml$)
        expect(html).toBe(
          `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v1.2.3/gn-wc.js"></script>
<gn-dataset-view-map
        api-url="http://gn-api.url/"
        dataset-id="${metadata.uniqueIdentifier}"
        primary-color="#0f4395"
        secondary-color="#8bc832"
        main-color="#555"
        background-color="#fdfbff"
        main-font="'Inter', sans-serif"
        title-font="'DM Serif Display', serif"
></gn-dataset-view-map>`
        )
      })
    })
  })
  describe('Table view', () => {
    beforeEach(() => {
      component.viewType$.next('table')
    })
    describe('init webComponentHtml$', () => {
      it('should generate HTML based on configs', async () => {
        const html = await firstValueFrom(component.webComponentHtml$)
        expect(html).toBe(
          `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v1.2.3/gn-wc.js"></script>
  <gn-dataset-view-table
          api-url="http://gn-api.url/"
          dataset-id="${metadata.uniqueIdentifier}"
          primary-color="#0f4395"
          secondary-color="#8bc832"
          main-color="#555"
          background-color="#fdfbff"
          main-font="'Inter', sans-serif"
          title-font="'DM Serif Display', serif"
  ></gn-dataset-view-table>`
        )
      })
    })
  })
})
