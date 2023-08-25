import { Component, Injector, Input, OnChanges, OnInit } from '@angular/core'
import {
  LinkClassifierService,
  LinkUsage,
  ThemeService,
} from '@geonetwork-ui/util/shared'
import { Configuration, SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

export const apiConfiguration = new Configuration()

@Component({
  selector: 'wc-base',
  template: `<div></div>`,
})
export class BaseComponent implements OnChanges, OnInit {
  @Input() apiUrl = null
  @Input() searchId: string
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'
  @Input() mainFont = ''
  @Input() titleFont = ''

  isInitialized = false
  facade: SearchFacade
  translate: TranslateService
  searchService: SearchApiService
  recordsRepository: RecordsRepositoryInterface
  linkClassifier: LinkClassifierService

  constructor(private injector: Injector) {
    this.facade = injector.get(SearchFacade)
    this.translate = injector.get(TranslateService)
    this.searchService = injector.get(SearchApiService)
    this.recordsRepository = injector.get(RecordsRepositoryInterface)
    this.linkClassifier = injector.get(LinkClassifierService)
  }

  ngOnInit() {
    if (!this.isInitialized && this.apiUrl) {
      this.init()
    }
  }

  ngOnChanges() {
    if (!this.isInitialized && this.apiUrl) {
      this.init()
    } else {
      this.changes()
    }
  }

  init() {
    apiConfiguration.basePath = this.apiUrl
    this.translate.reloadLang(this.translate.currentLang)
    ThemeService.applyCssVariables(
      this.primaryColor,
      this.secondaryColor,
      this.mainColor,
      this.backgroundColor,
      this.mainFont,
      this.titleFont
    )
    this.facade.init(this.searchId)
    this.isInitialized = true
  }

  changes() {
    // to override
  }

  async getRecordLink(
    uuid: string,
    usages: LinkUsage[]
  ): Promise<DatasetDistribution | null> {
    const record = await firstValueFrom(
      this.recordsRepository.getByUniqueIdentifier(uuid)
    )
    if (record?.kind !== 'dataset') {
      return null
    }
    const dataLinks = record.distributions.filter((link) =>
      usages.some((usage) => this.linkClassifier.hasUsage(link, usage))
    )
    return dataLinks[0]
  }
}
