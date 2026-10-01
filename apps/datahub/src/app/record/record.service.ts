import { Location } from '@angular/common'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import {
  BehaviorSubject,
  combineLatest,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs'

@Injectable({ providedIn: 'root' })
export class RecordService {
  private router = inject(Router)
  private location = inject(Location)
  private recordsRepository = inject(RecordsRepositoryInterface)
  private platformServiceInterface = inject(PlatformServiceInterface)

  metadata$ = new BehaviorSubject<CatalogRecord>(null)

  back(): void {
    this.router.lastSuccessfulNavigation?.previousNavigation
      ? this.location.back()
      : this.router.navigateByUrl('/search')
  }

  canEditFromUrl$ = this.metadata$.pipe(
    switchMap((metadata) =>
      getGlobalConfig().EDIT_URL_TEMPLATE
        ? metadata.kind === 'reuse' && getGlobalConfig().REUSE_FORM_URL
          ? of(false)
          : this.recordsRepository.canEditIndexedRecord(metadata)
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

  writableGroupId$ = this.platformServiceInterface
    .getUserPermissionsByGroup()
    .pipe(
      map(
        (permissions) =>
          permissions.find((p) => p.canApprove)?.groupId?.toString() ??
          permissions.find((p) => p.canEdit)?.groupId?.toString() ??
          null
      )
    )

  reuseNotificationAllowed$ = getGlobalConfig().REUSE_FORM_URL
    ? combineLatest([this.writableGroupId$, this.metadata$]).pipe(
        map(
          ([groupId, metadata]) =>
            groupId !== null && metadata?.kind === 'dataset'
        )
      )
    : of(false)

  showEditDeleteReuseButtons$ = this.metadata$.pipe(
    switchMap((metadata) =>
      metadata.kind === 'reuse' && getGlobalConfig().REUSE_FORM_URL
        ? // keeping it simple here for now, as edit and delete use the same conditions
          this.recordsRepository.canEditIndexedRecord(metadata)
        : of(false)
    )
  )
}
