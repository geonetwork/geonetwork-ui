import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MetadataLink, MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { map, startWith, switchMap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import { combineLatest, from, of } from 'rxjs'

@Component({
  selector: 'gn-ui-data-downloads',
  templateUrl: './data-downloads.component.html',
  styleUrls: ['./data-downloads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDownloadsComponent {
  constructor(public facade: MdViewFacade) {}

  private downloadFormats = {
    csv: ['csv'],
    geojson: ['geojson'],
    json: ['json'],
    shp: ['shp', 'shape'],
    kml: ['kml'],
    gpkg: ['gpkg', 'geopackage'],
    excel: ['xls', 'xlsx'],
    pdf: ['pdf'],
    zip: ['zip'],
  }

  links$ = this.facade.downloadLinks$.pipe(
    switchMap((links) => {
      const wfsLinks = links.filter((link) =>
        link.protocol.startsWith('OGC:WFS')
      )
      const otherLinks = links
        .filter((link) => !link.protocol.startsWith('OGC:WFS'))
        .map((link) => ({ ...link, format: this.getFormat(link) }))

      return combineLatest(
        wfsLinks.map((link) => from(this.getLinksWithWfsFormats(link)))
      ).pipe(
        map(
          (wfsDownloadLinks) =>
            wfsDownloadLinks.reduce((prev, curr) => [...prev, ...curr]),
          []
        ),
        map((wfsDownloadLinks) =>
          wfsDownloadLinks
            .map((link) => ({
              ...link,
              format: this.getWfsDisplayFormat(link),
            }))
            .filter((link) => link.format !== undefined)
        ),
        map((wfsDownloadLinks) => [...otherLinks, ...wfsDownloadLinks]),
        startWith(otherLinks)
      )
    })
  )

  getFormat(link: MetadataLink): string {
    if ('format' in link) {
      return link.format
    }
    for (const format in this.downloadFormats) {
      for (const alias of this.downloadFormats[format]) {
        if (this.findFileFormats(link, alias)) return format
      }
    }
    return 'unknown'
  }

  findFileFormats(link: MetadataLink, format: string): boolean {
    return (
      ('name' in link && new RegExp(`${format}`, 'i').test(link.name)) ||
      ('url' in link && new RegExp(`${format}`, 'i').test(link.url))
    )
  }

  getLinksWithWfsFormats(
    link: MetadataLinkValid
  ): Promise<MetadataLinkValid[]> {
    return new WfsEndpoint(link.url).isReady().then((endpoint) => {
      const featureType = endpoint.getFeatureTypeSummary(link.name)
      return featureType.outputFormats.map((format) => ({
        ...link,
        url: endpoint.getFeatureUrl(featureType.name, undefined, format),
        format: format,
      }))
    })
  }

  getWfsDisplayFormat(link: MetadataLinkValid): string {
    for (const format in this.downloadFormats) {
      for (const alias of this.downloadFormats[format]) {
        if ('format' in link && new RegExp(`${format}`, 'i').test(link.format))
          return `WFS:${format}`
      }
    }
    return undefined
  }
}
