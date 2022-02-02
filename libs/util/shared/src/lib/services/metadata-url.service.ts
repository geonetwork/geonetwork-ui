import { Inject, Injectable } from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { LangService } from '@geonetwork-ui/util/i18n'

@Injectable({
  providedIn: 'root',
})
export class MetadataUrlService {
  constructor(
    private lang: LangService,
    @Inject(Configuration) private apiConfiguration: Configuration
  ) {}

  getUrl(uuid: string, apiPath: string = this.apiConfiguration.basePath) {
    const prefix = `${apiPath}/../`
    return `${prefix}${this.lang.iso3}/catalog.search#/metadata/${uuid}`
  }
}
