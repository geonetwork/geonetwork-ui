import { Injectable } from '@angular/core'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util/shared'
import { LinkClassifierService, LinkUsage } from './link-classifier.service'

@Injectable({
  providedIn: 'root',
})
export class LinkHelperService {
  constructor(private linkClassifier: LinkClassifierService) {}

  hasLinks(record: MetadataRecord): boolean {
    return 'links' in record
  }
  isValidLink(link: MetadataLink): boolean {
    return !('invalid' in link)
  }
  isApiLink(link: MetadataLink): boolean {
    return (
      this.linkClassifier.getUsagesForLink(link).indexOf(LinkUsage.API) > -1
    )
  }
  isMapApiLink(link: MetadataLink): boolean {
    return (
      this.linkClassifier.getUsagesForLink(link).indexOf(LinkUsage.MAPAPI) > -1
    )
  }
  isDownloadLink(link: MetadataLink): boolean {
    return (
      this.linkClassifier.getUsagesForLink(link).indexOf(LinkUsage.DOWNLOAD) >
      -1
    )
  }
  isDataLink(link: MetadataLink): boolean {
    return (
      this.linkClassifier.getUsagesForLink(link).indexOf(LinkUsage.DATA) > -1
    )
  }
  isOtherLink(link: MetadataLink): boolean {
    return this.linkClassifier.getUsagesForLink(link).length === 0
  }
}
