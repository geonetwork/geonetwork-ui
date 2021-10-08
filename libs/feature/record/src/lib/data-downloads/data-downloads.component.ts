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
        map((wfsDownloadLinks) => [...otherLinks, ...wfsDownloadLinks]),
        startWith(otherLinks)
      )
    })
  )

  getFormat(link: MetadataLink) {
    const formats = {
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
    if ('format' in link) {
      return link.format
    }
    for (const format in formats) {
      for (const alias of formats[format]) {
        if (this.findFileFormats(link, alias)) return format
      }
    }
    return 'unknown'
  }

  findFileFormats(link: MetadataLink, format: string) {
    return (
      ('name' in link && link.name.match(new RegExp(`${format}`, 'i'))) ||
      ('url' in link && link.url.match(new RegExp(`${format}`, 'i')))
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
        format: `WFS:${format}`,
      }))
    })
  }
}
