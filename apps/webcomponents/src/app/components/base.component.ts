import {
  Component,
  ElementRef,
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
import { Configuration, SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'
import { OverlayContainer } from '@angular/cdk/overlay'
import { WebcomponentOverlayContainer } from '../webcomponent-overlay-container'

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

    const elementRef = injector.get(ElementRef)
    const overlayContainer = injector.get(
      OverlayContainer
    ) as WebcomponentOverlayContainer
    overlayContainer.setRoot(elementRef.nativeElement.shadowRoot)
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
    this.copyFontFacesToDocument()
    this.isInitialized = true
  }

  changes() {
    // to override
  }

  private copyFontFacesToDocument() {
    // get the list of font face definitions in the Shadow DOM
    const root = this.injector.get(ElementRef).nativeElement as HTMLElement
    const styles = root.shadowRoot.styleSheets
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
