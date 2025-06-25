import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordApisComponent } from './record-apis.component'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject } from 'rxjs'
import { MockBuilder } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class MdViewFacadeMock {
  selectedApiLink$ = new BehaviorSubject([])
  apiLinks$ = new BehaviorSubject([])
}

const serviceDistributionMock = {
  type: 'service',
  url: new URL('http://myogcapifeatures.test'),
  accessServiceProtocol: 'ogcFeatures',
} as DatasetServiceDistribution

describe('RecordApisComponent', () => {
  let component: RecordApisComponent
  let fixture: ComponentFixture<RecordApisComponent>
  let facade

  beforeEach(() => MockBuilder(RecordApisComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    fixture = TestBed.createComponent(RecordApisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#openRecordApiForm', () => {
    beforeEach(() => {
      component.openRecordApiForm(serviceDistributionMock)
    })
    it('should update selectedApiLink', () => {
      expect(component.selectedApiLink).toEqual(serviceDistributionMock)
    })
    it('should update maxHeight for transition', () => {
      expect(component.maxHeight).toEqual('700px')
    })
    it('should update opacity for transition', () => {
      expect(component.opacity).toEqual(1)
    })
  })

  describe('#closeRecordApiForm', () => {
    it('should update selectedApiLink', () => {
      component.closeRecordApiForm()
      expect(component.selectedApiLink).toBeUndefined()
    })
    it('should update maxHeight for transition', () => {
      expect(component.maxHeight).toEqual('0px')
    })
    it('should update opacity for transition', () => {
      expect(component.opacity).toEqual(0)
    })
  })

  describe('apiLinks$', () => {
    beforeEach(() => {
      const mockLinks = [
        { accessServiceProtocol: 'ogcFeatures' },
        { accessServiceProtocol: 'GPFDL' },
        { accessServiceProtocol: 'wms' },
      ] as DatasetServiceDistribution[]

      facade.apiLinks$.next(mockLinks)
    })
    it('should sort links with GPFDL protocol first', (done) => {
      component.apiLinks$.subscribe((sortedLinks) => {
        expect(sortedLinks).toEqual([
          { accessServiceProtocol: 'GPFDL' },
          { accessServiceProtocol: 'ogcFeatures' },
          { accessServiceProtocol: 'wms' },
        ])
        done()
      })
    })
  })
})
