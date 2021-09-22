import { Injectable } from '@angular/core'
import { DatasetFinderService, LinkUsage } from '@geonetwork-ui/feature/dataviz'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util/shared'

@Injectable({
  providedIn: 'root',
})
export class LinkHelperService {
  constructor(private datasetFinder: DatasetFinderService) {}

  hasLinks(record: MetadataRecord): boolean {
    return 'links' in record
  }
  isDataLink(link: MetadataLink): boolean {
    return this.datasetFinder.getLinkUsages(link).length > 0
  }
  isOtherLink(link: MetadataLink): boolean {
    return this.datasetFinder.getLinkUsages(link).length === 0
  }
  isValidLink(link: MetadataLink): boolean {
    return !('invalid' in link)
  }
  isMapLink(link: MetadataLink): boolean {
    return this.datasetFinder.getLinkUsages(link).indexOf(LinkUsage.MAP) > -1
  }
  isDownloadLink(link: MetadataLink): boolean {
    return (
      this.datasetFinder.getLinkUsages(link).indexOf(LinkUsage.DOWNLOAD) > -1
    )
  }
}
