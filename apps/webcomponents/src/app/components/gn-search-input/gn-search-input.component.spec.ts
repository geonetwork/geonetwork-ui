import { TestBed } from '@angular/core/testing'
import { MockProviders } from 'ng-mocks'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateService } from '@ngx-translate/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { LinkClassifierService } from '@geonetwork-ui/util/shared'
import {
  simpleDatasetRecordFixture,
  simpleReuseRecordFixture,
  simpleServiceRecordFixture,
} from '@geonetwork-ui/common/fixtures'
import { GnSearchInputComponent } from './gn-search-input.component'

describe('GnSearchInputComponent', () => {
  let component: GnSearchInputComponent
  let openSpy: jest.SpyInstance
  let focus: jest.Mock

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProviders(
          SearchFacade,
          TranslateService,
          SearchApiService,
          RecordsRepositoryInterface,
          LinkClassifierService
        ),
      ],
    })
    component = TestBed.runInInjectionContext(
      () => new GnSearchInputComponent()
    )
    focus = jest.fn()
    openSpy = jest.spyOn(window, 'open').mockReturnValue({ focus } as Window)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('select', () => {
    it.each([
      ['dataset', simpleDatasetRecordFixture],
      ['service', simpleServiceRecordFixture],
      ['reuse', simpleReuseRecordFixture],
    ] as const)('opens the DataHub %s route', (kind, createRecord) => {
      const record = createRecord()
      component.openOnSelect = '/datahub/${kind}/${uuid}'

      component.select(record)

      expect(openSpy).toHaveBeenCalledWith(
        `/datahub/${kind}/${record.uniqueIdentifier}`,
        '_self'
      )
      expect(focus).toHaveBeenCalledTimes(1)
    })

    it('supports existing templates using only the UUID', () => {
      const record = simpleDatasetRecordFixture()
      component.openOnSelect = '/datahub/dataset/${uuid}'

      component.select(record)

      expect(openSpy).toHaveBeenCalledWith(
        `/datahub/dataset/${record.uniqueIdentifier}`,
        '_self'
      )
    })

    it('does not navigate without an openOnSelect template', () => {
      component.select(simpleDatasetRecordFixture())

      expect(openSpy).not.toHaveBeenCalled()
    })
  })
})
