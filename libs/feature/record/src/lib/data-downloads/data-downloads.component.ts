import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  getFileFormat,
  MetadataLinkType,
  sortPriority,
} from '@geonetwork-ui/util/shared'
import { MetadataLink } from '@geonetwork-ui/util/shared'
import { combineLatest, of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { DataService } from '../service/data.service'
import { MdViewFacade } from '../state'

@Component({
  selector: 'gn-ui-data-downloads',
  templateUrl: './data-downloads.component.html',
  styleUrls: ['./data-downloads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDownloadsComponent {
  constructor(public facade: MdViewFacade, private dataService: DataService) {}

  error: string = null

  links$ = this.facade.downloadLinks$.pipe(
    switchMap((links) => {
      const wfsLinks = links.filter(
        (link) => link.type === MetadataLinkType.WFS
      )
      const esriRestLinks = links
        .filter((link) => link.type === MetadataLinkType.ESRI_REST)
        .flatMap((link) => this.dataService.getDownloadLinksFromEsriRest(link))
      const otherLinks = links.filter(
        (link) =>
          link.type !== MetadataLinkType.WFS &&
          link.type !== MetadataLinkType.ESRI_REST
      )

      this.error = null

      return combineLatest(
        wfsLinks.length > 0
          ? wfsLinks.map((link) =>
              this.dataService.getDownloadLinksFromWfs(link)
            )
          : [of([] as MetadataLink[])]
      ).pipe(
        // flatten array
        map((wfsDownloadLinks) =>
          wfsDownloadLinks.reduce((prev, curr) => [...prev, ...curr], [])
        ),
        // only keep known formats
        map((wfsDownloadLinks) =>
          wfsDownloadLinks.filter((link) => !!getFileFormat(link))
        ),
        // remove duplicates
        map((wfsDownloadLinks) =>
          wfsDownloadLinks.filter(
            (link, i, links) =>
              links.findIndex(
                (firstLink) =>
                  getFileFormat(firstLink) === getFileFormat(link) &&
                  firstLink.name === link.name &&
                  firstLink.type === link.type
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
          allLinks.sort((a: MetadataLink, b: MetadataLink): number => {
            return sortPriority(b) - sortPriority(a)
          })
        )
      )
    })
  )
}
