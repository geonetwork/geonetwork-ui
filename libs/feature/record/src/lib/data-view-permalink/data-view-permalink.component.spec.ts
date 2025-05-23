import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  DataViewPermalinkComponent,
  WEB_COMPONENT_EMBEDDER_URL,
} from './data-view-permalink.component'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { MdViewFacade } from '../state'
import { provideRepositoryUrl } from '@geonetwork-ui/api/repository'
import { MockBuilder } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'

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

const baseUrl = 'https://example.com/wc-embedder'

jest.mock('@geonetwork-ui/util/shared', () => {
  const originalModule = jest.requireActual('@geonetwork-ui/util/shared')
  return {
    ...originalModule,
    GEONETWORK_UI_TAG_NAME: 'v1.2.3',
  }
})

describe('DataViewPermalinkComponent', () => {
  let component: DataViewPermalinkComponent
  let fixture: ComponentFixture<DataViewPermalinkComponent>
  let facade

  beforeEach(() => MockBuilder(DataViewPermalinkComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        provideRepositoryUrl('http://gn-api.url/'),
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
    component.viewType$.next('chart')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Chart view', () => {
    describe('init permalinkUrl$', () => {
      it('should generate URL based on configs', async () => {
        const url = await firstValueFrom(component.permalinkUrl$)
        expect(url).toBe(
          `https://example.com/wc-embedder?v=v1.2.3&e=gn-dataset-view-chart&a=aggregation%3D${
            chartConfig1.aggregation
          }&a=x-property%3D${chartConfig1.xProperty}&a=y-property%3D${
            chartConfig1.yProperty
          }&a=chart-type%3D${
            chartConfig1.chartType
          }&a=api-url%3D${encodeURIComponent(
            component.config.basePath
          )}&a=dataset-id%3D${
            metadata.uniqueIdentifier
          }&a=primary-color%3D%230f4395&a=secondary-color%3D%238bc832&a=main-color%3D%23555&a=background-color%3D%23fdfbff`
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
          `https://example.com/wc-embedder?v=v1.2.3&e=gn-dataset-view-chart&a=aggregation%3D${
            chartConfig2.aggregation
          }&a=x-property%3D${chartConfig2.xProperty}&a=y-property%3D${
            chartConfig2.yProperty
          }&a=chart-type%3D${
            chartConfig2.chartType
          }&a=api-url%3D${encodeURIComponent(
            component.config.basePath
          )}&a=dataset-id%3D${
            metadata.uniqueIdentifier
          }&a=primary-color%3D%230f4395&a=secondary-color%3D%238bc832&a=main-color%3D%23555&a=background-color%3D%23fdfbff`
        )
      })
    })
  })
  describe('Map view', () => {
    beforeEach(() => {
      component.viewType$.next('map')
    })
    describe('init permalinkUrl$', () => {
      it('should generate URL based on configs', async () => {
        const url = await firstValueFrom(component.permalinkUrl$)
        expect(url).toBe(
          `https://example.com/wc-embedder?v=v1.2.3&e=gn-dataset-view-map&a=api-url%3D${encodeURIComponent(
            component.config.basePath
          )}&a=dataset-id%3D${
            metadata.uniqueIdentifier
          }&a=primary-color%3D%230f4395&a=secondary-color%3D%238bc832&a=main-color%3D%23555&a=background-color%3D%23fdfbff`
        )
      })
    })
  })
  describe('Table view', () => {
    beforeEach(() => {
      component.viewType$.next('table')
    })
    describe('init permalinkUrl$', () => {
      it('should generate URL based on configs', async () => {
        const url = await firstValueFrom(component.permalinkUrl$)
        expect(url).toBe(
          `https://example.com/wc-embedder?v=v1.2.3&e=gn-dataset-view-table&a=api-url%3D${encodeURIComponent(
            component.config.basePath
          )}&a=dataset-id%3D${
            metadata.uniqueIdentifier
          }&a=primary-color%3D%230f4395&a=secondary-color%3D%238bc832&a=main-color%3D%23555&a=background-color%3D%23fdfbff`
        )
      })
    })
  })
})
