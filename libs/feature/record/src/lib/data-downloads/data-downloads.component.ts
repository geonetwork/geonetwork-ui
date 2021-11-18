import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DownloadFormatType,
  getDownloadFormat,
  getLinksWithEsriRestFormats,
  getLinksWithWfsFormats,
  LinkHelperService,
} from '@geonetwork-ui/feature/search'
import { map, startWith, switchMap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { combineLatest, from } from 'rxjs'

@Component({
  selector: 'gn-ui-data-downloads',
  templateUrl: './data-downloads.component.html',
  styleUrls: ['./data-downloads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDownloadsComponent {
  constructor(
    public facade: MdViewFacade,
    private linkHelper: LinkHelperService
  ) {}

  error: string = null

  links$ = this.facade.downloadLinks$.pipe(
    switchMap((links) => {
      const wfsLinks = links.filter((link) => this.linkHelper.isWfsLink(link))
      const esriRestLinks = links
        .filter((link) => this.linkHelper.isEsriRestFeatureServer(link))
        .flatMap((link) => getLinksWithEsriRestFormats(link))
      const otherLinks = links
        .filter((link) => !/^OGC:WFS|ESRI:REST/.test(link.protocol))
        .map((link) =>
          'format' in link
            ? link
            : {
                ...link,
                format: getDownloadFormat(link, DownloadFormatType.FILE),
              }
        )

      this.error = null

      return combineLatest(
        wfsLinks.map((link) =>
          from(
            getLinksWithWfsFormats(link).catch((e) => {
              this.error = e.message
              return []
            })
          )
        )
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
              format: getDownloadFormat(link, DownloadFormatType.WFS),
            }))
            .filter((link) => link.format !== 'unknown')
            .filter(
              (link, i, links) =>
                links.findIndex(
                  (firstLink) =>
                    firstLink.format === link.format &&
                    firstLink.name === link.name
                ) === i
            )
        ),
        map((wfsDownloadLinks) => [
          ...otherLinks,
          ...wfsDownloadLinks,
          ...esriRestLinks,
        ]),
        startWith([...otherLinks, ...esriRestLinks])
      )
    })
  )
}
