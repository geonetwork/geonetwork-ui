import { Injectable, inject } from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'
import { toLang3 } from '@geonetwork-ui/util/i18n'

@Injectable({
  providedIn: 'root',
})
export class MetadataUrlService {
  private translate = inject(TranslateService)
  private apiConfiguration = inject<Configuration>(Configuration)

  getUrl(uuid: string, apiPath: string = this.apiConfiguration.basePath) {
    const prefix = `${apiPath}/../`
    return `${prefix}${toLang3(
      this.translate.currentLang
    )}/catalog.search#/metadata/${uuid}`
  }
}
