import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { getFileFormat, sortPriority } from '@geonetwork-ui/util/shared'
import { combineLatest, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import {
  DatasetDistribution,
  DatasetServiceDistribution,
} from '@geonetwork-ui/common/domain/record'

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
        (link) =>
          link.type === 'service' && link.accessServiceProtocol === 'wfs'
      )
      const esriRestLinks = links
        .filter(
          (link) =>
            link.type === 'service' && link.accessServiceProtocol === 'esriRest'
        )
        .flatMap((link) =>
          this.dataService.getDownloadLinksFromEsriRest(
            link as DatasetServiceDistribution
          )
        )
      const otherLinks = links.filter(
        (link) =>
          link.type !== 'service' ||
          (link.type === 'service' &&
            link.accessServiceProtocol !== 'esriRest' &&
            link.accessServiceProtocol !== 'wfs')
      )

      this.error = null

      return combineLatest(
        wfsLinks.length > 0
          ? wfsLinks.map((link) =>
              this.dataService.getDownloadLinksFromWfs(
                link as DatasetServiceDistribution
              )
            )
          : [of([] as DatasetDistribution[])]
      ).pipe(
        map(flattenArray),
        map(removeLinksWithUnknownFormat),
        map(removeDuplicateLinks),
        map((wfsDownloadLinks) => [
          ...otherLinks,
          ...wfsDownloadLinks,
          ...esriRestLinks,
        ]),
        catchError((e) => {
          this.error = e.message
          return of([...otherLinks, ...esriRestLinks])
        }),
        map(sortLinks)
      )
    })
  )
}

const flattenArray = (arrayOfArrays) =>
  arrayOfArrays.reduce((prev, curr) => [...prev, ...curr], [])

const removeLinksWithUnknownFormat = (wfsDownloadLinks) =>
  wfsDownloadLinks.filter((link) => !!getFileFormat(link))

const removeDuplicateLinks = (wfsDownloadLinks) =>
  wfsDownloadLinks.filter(
    (link, i, links) =>
      links.findIndex(
        (firstLink) =>
          getFileFormat(firstLink) === getFileFormat(link) &&
          firstLink.name === link.name &&
          firstLink.type === link.type
      ) === i
  )

const sortLinks = (allLinks) =>
  allLinks.sort((a: DatasetDistribution, b: DatasetDistribution): number => {
    return sortPriority(b) - sortPriority(a)
  })
