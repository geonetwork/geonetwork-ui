import {
  Component,
  ElementRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core'
import {
  LinkClassifierService,
  LinkUsage,
  ThemeService,
} from '@geonetwork-ui/util/shared'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Overlay, OverlayContainer } from '@angular/cdk/overlay'
import { WebcomponentOverlayContainer } from '../webcomponent-overlay-container'
import {
  MetadataLanguage,
  standaloneConfigurationObject,
  TextLanguage,
} from '../configuration'

export const DefaultProviders = [
  SearchFacade,
  Overlay, // we're providing an overlay service in this context to use the container specitic to each web component
  {
    provide: OverlayContainer,
    useClass: WebcomponentOverlayContainer,
  },
]

@Component({
  selector: 'wc-base',
  template: `<div></div>`,
  standalone: false,
})
export class BaseComponent implements OnChanges, OnInit {
  private injector = inject(Injector)

  @Input() apiUrl = null
  @Input() proxyPath = null
  @Input() searchId: string
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'
  @Input() mainFont = ''
  @Input() titleFont = ''
  @Input() textLanguage: TextLanguage = 'browser'
  @Input() metadataLanguage: MetadataLanguage = ''

  isInitialized = false
  facade: SearchFacade
  translate: TranslateService
  searchService: SearchApiService
  recordsRepository: RecordsRepositoryInterface
  linkClassifier: LinkClassifierService

  constructor() {
    this.facade = this.injector.get(SearchFacade)
    this.translate = this.injector.get(TranslateService)
    this.searchService = this.injector.get(SearchApiService)
    this.recordsRepository = this.injector.get(RecordsRepositoryInterface)
    this.linkClassifier = this.injector.get(LinkClassifierService)
  }

  ngOnInit() {
    const elementRef = this.injector.get(ElementRef)
    const overlayContainer = this.injector.get(
      OverlayContainer
    ) as WebcomponentOverlayContainer
    overlayContainer.setRoot(elementRef.nativeElement.shadowRoot)

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
    standaloneConfigurationObject.apiConfiguration.basePath = this.apiUrl
    standaloneConfigurationObject.proxyPath ??= this.proxyPath
    standaloneConfigurationObject.metadataLanguage ??= this.metadataLanguage
    standaloneConfigurationObject.textLanguage ??= this.textLanguage

    if (this.textLanguage === 'browser') {
      this.translate.use(this.translate.getBrowserLang())
    } else {
      this.translate.use(this.textLanguage)
    }

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
    copyFontFacesToDocument(this.injector.get(ElementRef).nativeElement)
    this.isInitialized = true
  }

  changes() {
    // to override
  }

  async getRecordLink(
    uuid: string,
    usages: LinkUsage[]
  ): Promise<DatasetOnlineResource | null> {
    const record = await firstValueFrom(this.recordsRepository.getRecord(uuid))
    if (record?.kind !== 'dataset') {
      return null
    }
    const dataLinks = record.onlineResources.filter((link) =>
      usages.some((usage) => this.linkClassifier.hasUsage(link, usage))
    )
    return dataLinks[0]
  }
}

export function copyFontFacesToDocument(rootElement: HTMLElement) {
  // get the list of font face definitions in the Shadow DOM
  const styles = rootElement.shadowRoot.styleSheets
  const fontFaces = Array.from(styles).reduce(
    (prev, curr) => [
      ...prev,
      ...Array.from(curr.cssRules)
        .filter((rule) => rule.cssText.startsWith('@font-face'))
        .map((rule) => rule.cssText),
    ],
    []
  )

  // all font faces are then copied to the document
  const style = document.createElement('style')
  const cssText = fontFaces.join('\n')
  style.appendChild(document.createTextNode(cssText))
  document.head.appendChild(style)
}
