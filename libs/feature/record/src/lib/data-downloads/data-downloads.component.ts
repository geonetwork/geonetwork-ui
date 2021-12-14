import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DownloadFormatType,
  getDownloadFormat,
  LinkHelperService,
} from '@geonetwork-ui/feature/search'
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { combineLatest } from 'rxjs'
import { DataService } from '../service/data.service'

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
        .filter(this.linkHelper.isEsriRestFeatureServer)
        .flatMap(this.dataService.getDownloadLinksFromEsriRest)
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
        wfsLinks.map((link) => this.dataService.getDownloadLinksFromWfs(link))
      ).pipe(
        catchError((e) => {
          this.error = e.message
          return []
        }),
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
