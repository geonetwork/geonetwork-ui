import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { appRoutes } from './app.routes'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'

@Injectable({
  providedIn: 'root',
})
export class EditorRouterService {
  private router = inject(Router)

  initRoutes() {
    this.router.resetConfig(appRoutes)
  }

  getSearchRoute(): string {
    return 'catalog/search'
  }

  getDatahubSearchRoute(): string {
    return new URL(
      `${getGlobalConfig().DATAHUB_URL}/search`,
      window.location.toString()
    ).toString()
  }

  getDefaultSort(): SortByField {
    return SortByEnum.CHANGE_DATE
  }
}
