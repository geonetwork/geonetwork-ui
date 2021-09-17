import { Inject, Injectable, Optional } from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'

@Injectable({
  providedIn: 'root',
})
export class MetadataUrlService {
  constructor(
    private translate: TranslateService,
    @Inject(Configuration) private apiConfiguration: Configuration
  ) {}

  getUrl(uuid: string, apiPath: string = this.apiConfiguration.basePath) {
    const prefix = `${apiPath}/../`
    return `${prefix}${
      LANG_2_TO_3_MAPPER[this.translate.currentLang]
    }/catalog.search#/metadata/${uuid}`
  }
}
