import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { LANG_2_TO_3_MAPPER } from '../i18n/i18n.constants'

const DEFAULT_API_PATH = '/geonetwork/srv/api'

@Injectable({
  providedIn: 'root',
})
export class MetadataUrlService {
  constructor(private translate: TranslateService) {}

  getUrl(uuid: string, apiPath: string = DEFAULT_API_PATH) {
    const prefix = `${apiPath}/../`
    return `${prefix}${
      LANG_2_TO_3_MAPPER[this.translate.currentLang]
    }/catalog.search#/metadata/${uuid}`
  }
}
