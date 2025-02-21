import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('seo.page.title.home')
marker('seo.page.title.news')
marker('seo.page.title.search')
marker('seo.page.title.organizations')
marker('seo.page.title.metadata')
marker('seo.page.title.organization')

@Injectable()
export class DatahubTemplatePageTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
    private translateService: TranslateService
  ) {
    super()
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const config = getGlobalConfig()
    const pageTitle = this.buildTitle(routerState)

    if (pageTitle !== undefined) {
      this.translateService
        .get(pageTitle)
        .subscribe((translatedKey: string) => {
          const formattedTitle = config.DATAHUB_PAGE_TITLE_PATTERN.replace(
            '{pageTitle}',
            translatedKey
          ).replace('{appTitle}', config.DATAHUB_PAGE_TITLE_APP)
          this.title.setTitle(formattedTitle)
        })
    } else {
      this.title.setTitle(config.DATAHUB_PAGE_TITLE_APP)
    }
  }
}
