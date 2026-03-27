import { Location } from '@angular/common'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { BehaviorSubject, of, switchMap, take, tap } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class RecordHeaderService {
  private router = inject(Router)
  private location = inject(Location)
  private recordsRepository = inject(RecordsRepositoryInterface)

  metadata$ = new BehaviorSubject<CatalogRecord>(null)

  back(): void {
    this.router.lastSuccessfulNavigation?.previousNavigation
      ? this.location.back()
      : this.router.navigateByUrl('/search')
  }

  canEditFromUrl$ = this.metadata$.pipe(
    switchMap((metadata) =>
      getGlobalConfig().EDIT_URL_TEMPLATE
        ? this.recordsRepository.canEditIndexedRecord(metadata)
        : of(false)
    )
  )

  openEditUrl(): void {
    this.metadata$
      .pipe(
        take(1),
        tap((metadata) => {
          const template = getGlobalConfig().EDIT_URL_TEMPLATE
          const url = template
            ? template.replace('${record_id}', metadata.uniqueIdentifier)
            : ''
          if (url) window.open(url, '_blank')
        })
      )
      .subscribe()
  }
}
