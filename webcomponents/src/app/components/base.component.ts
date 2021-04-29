import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ColorService } from '@lib/common'
import { Configuration } from '@lib/gn-api'
import { SearchFacade } from '@lib/search'
import { TranslateService } from '@ngx-translate/core'

export const apiConfiguration = new Configuration()

@Component({
  selector: 'wc-base',
  template: `<div></div>`,
})
export class BaseComponent implements OnInit, OnChanges {
  @Input() apiUrl = '/'
  @Input() searchId: string
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'

  isInitialized = false
  facade: SearchFacade
  translate: TranslateService

  constructor(private injector: Injector) {
    this.facade = injector.get(SearchFacade)
    this.translate = injector.get(TranslateService)
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isInitialized) {
      apiConfiguration.basePath = this.apiUrl
      this.translate.reloadLang(this.translate.currentLang)
      ColorService.applyCssVariables(
        this.primaryColor,
        this.secondaryColor,
        this.mainColor,
        this.backgroundColor
      )
      this.isInitialized = true
      this.facade.init(this.searchId)
    }
  }
}
