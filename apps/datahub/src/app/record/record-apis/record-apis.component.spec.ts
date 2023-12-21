import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordApisComponent } from './record-apis.component'
import { TranslateModule } from '@ngx-translate/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject, firstValueFrom } from 'rxjs'

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
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordApisComponent],
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
    facade = TestBed.inject(MdViewFacade)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#openRecordApiForm', () => {
    beforeEach(() => {
      component.openRecordApiForm(serviceDistributionMock)
    })
    it('should update selectedApiLink$', async () => {
      expect(component.selectedApiLink).toEqual(serviceDistributionMock)
    })
  })

  describe('#closeRecordApiForm', () => {
    it('should pass undefined to selectedApiLink$', async () => {
      component.closeRecordApiForm()
      expect(component.selectedApiLink).toBeUndefined()
    })
  })
})
