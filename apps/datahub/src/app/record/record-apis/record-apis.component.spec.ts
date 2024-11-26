import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordApisComponent } from './record-apis.component'
import { TranslateModule } from '@ngx-translate/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject } from 'rxjs'
import { MockBuilder } from 'ng-mocks'

class MdViewFacadeMock {
  selectedApiLink$ = new BehaviorSubject([])
}

const serviceDistributionMock = {
  type: 'service',
  url: new URL('http://myogcapifeatures.test'),
  accessServiceProtocol: 'ogcFeatures',
} as DatasetServiceDistribution

describe('RecordApisComponent', () => {
  let component: RecordApisComponent
  let fixture: ComponentFixture<RecordApisComponent>

  beforeEach(() => MockBuilder(RecordApisComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()

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
      expect(component.maxHeight).toEqual('500px')
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
})
