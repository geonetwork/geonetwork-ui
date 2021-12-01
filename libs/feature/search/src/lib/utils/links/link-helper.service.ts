import { Injectable } from '@angular/core'
import {
  MetadataLink,
  MetadataLinkValid,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import { LinkClassifierService, LinkUsage } from './link-classifier.service'

@Injectable({
  providedIn: 'root',
})
export class LinkHelperService {
  constructor(private linkClassifier: LinkClassifierService) {}

  hasLinks(record: MetadataRecord): boolean {
    return 'links' in record
  }
  hasDownloadProtocols(protocols: string[]): boolean {
    return protocols
      .map((protocol) => {
        return { protocol }
      })
      .some((link: Partial<MetadataLink>) =>
        this.isDownloadLink(link as MetadataLink)
      )
  }
  hasMapApiProtocols(protocols: string[]): boolean {
    return protocols
      .map((protocol) => {
        return { protocol }
      })
      .some((link: Partial<MetadataLink>) =>
        this.isMapApiLink(link as MetadataLink)
      )
  }
  isValidLink(link: MetadataLink): boolean {
    return !('invalid' in link)
  }
  isApiLink(link: MetadataLink): boolean {
    return this.linkClassifier.getUsagesForLink(link).includes(LinkUsage.API)
  }
  isMapApiLink(link: MetadataLink): boolean {
    return this.linkClassifier.getUsagesForLink(link).includes(LinkUsage.MAPAPI)
  }
  isDownloadLink(link: MetadataLink): boolean {
    return this.linkClassifier
      .getUsagesForLink(link)
      .includes(LinkUsage.DOWNLOAD)
  }
  isDataLink(link: MetadataLink): boolean {
    return this.linkClassifier.getUsagesForLink(link).includes(LinkUsage.DATA)
  }
  isGeoDataLink(link: MetadataLink): boolean {
    return this.linkClassifier
      .getUsagesForLink(link)
      .includes(LinkUsage.GEODATA)
  }
  isOtherLink(link: MetadataLink): boolean {
    return this.linkClassifier.getUsagesForLink(link).length === 0
  }
  isWmsLink(link: MetadataLinkValid): boolean {
    return /^OGC:WMS/.test(link.protocol)
  }
  isWfsLink(link: MetadataLinkValid): boolean {
    return (
      /^OGC:WFS/.test(link.protocol) ||
      (/^ESRI:REST/.test(link.protocol) && /WFSServer/.test(link.url))
    )
  }
  isLandingPage(link: MetadataLink): boolean {
    return this.linkClassifier
      .getUsagesForLink(link)
      .includes(LinkUsage.LANDINGPAGE)
  }
  isEsriRestFeatureServer(link: MetadataLinkValid): boolean {
    return /^ESRI:REST/.test(link.protocol) && /FeatureServer/.test(link.url)
  }
  hasProtocolDownload(link: MetadataLinkValid): boolean {
    return /^WWW:DOWNLOAD/.test(link.protocol)
  }
}
