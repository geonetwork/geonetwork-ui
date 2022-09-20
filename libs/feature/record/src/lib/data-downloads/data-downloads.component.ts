import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  getFileFormat,
  getWfsFormat,
  LinkHelperService,
  sortPriority,
} from '@geonetwork-ui/util/shared'
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { combineLatest, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { DataService } from '../service/data.service'
import { MdViewFacade } from '../state'

@Component({
  selector: 'gn-ui-data-downloads',
  templateUrl: './data-downloads.component.html',
  styleUrls: ['./data-downloads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDownloadsComponent {
  constructor(
    public facade: MdViewFacade,
    private linkHelper: LinkHelperService,
    private dataService: DataService
  ) {}

  error: string = null

  links$ = this.facade.downloadLinks$.pipe(
    switchMap((links) => {
      const wfsLinks = links.filter((link) => this.linkHelper.isWfsLink(link))
      const esriRestLinks = links
        .filter((link) => this.linkHelper.isEsriRestFeatureServer(link))
        .flatMap((link) => this.dataService.getDownloadLinksFromEsriRest(link))
      const otherLinks = links
        .filter((link) => !/^OGC:WFS|ESRI:REST/.test(link.protocol))
        .map((link) =>
          'format' in link
            ? link
            : {
                ...link,
                format: getFileFormat(link),
              }
        )

      this.error = null

      return combineLatest(
        wfsLinks.length > 0
          ? wfsLinks.map((link) =>
              this.dataService.getDownloadLinksFromWfs(link)
            )
          : [of([] as MetadataLinkValid[])]
      ).pipe(
        // flatten array
        map((wfsDownloadLinks) =>
          wfsDownloadLinks.reduce((prev, curr) => [...prev, ...curr], [])
        ),
        map((wfsDownloadLinks) =>
          wfsDownloadLinks
            .map((link) => ({
              ...link,
              format: getWfsFormat(link),
            }))
            .filter((link) => link.format)
            // remove duplicates
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
        catchError((e) => {
          this.error = e.message
          return of([...otherLinks, ...esriRestLinks])
        }),
        map((allLinks) =>
          allLinks.sort(
            (a: MetadataLinkValid, b: MetadataLinkValid): number => {
              return sortPriority(b) - sortPriority(a)
            }
          )
        )
      )
    })
  )
}
