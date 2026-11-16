import { inject, Injectable, InjectionToken } from '@angular/core'
import { combineLatest, map, Observable, of, switchMap } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model'

export const MAX_FEATURE_COUNT = new InjectionToken<string>('maxFeatureCount')

@Injectable({
  providedIn: 'root',
})
export class MdViewService {
  private metadataViewFacade = inject(MdViewFacade)
  private maxFeatureCount = Number(
    inject(MAX_FEATURE_COUNT, { optional: true })
  )
  private dataService = inject(DataService)

  exceedsMaxFeatureCount$ = (
    selectedLink$: Observable<DatasetOnlineResource>
  ) => {
    return combineLatest([
      this.metadataViewFacade.geoDataLinksWithGeometry$,
      selectedLink$,
    ]).pipe(
      map(([links, selectedLink]) =>
        selectedLink != null ? selectedLink : links[0]
      ),
      switchMap((link) => {
        return link && link.accessServiceProtocol === 'wfs'
          ? this.dataService
              .getWfsFeatureCount(link.url.toString(), link.name)
              .pipe(map((count) => count > this.maxFeatureCount))
          : of(false)
      })
    )
  }
}
