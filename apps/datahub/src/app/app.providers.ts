import {
  importProvidersFrom,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core'
import { getGeometryFromGeoJSON, PROXY_PATH } from '@geonetwork-ui/util/shared'
import {
  getGlobalConfig,
  getMapContextLayerFromConfig,
  getOptionalMapConfig,
  getOptionalSearchConfig,
  getThemeConfig,
} from '@geonetwork-ui/util/app-config'
import {
  LOGIN_URL,
  METADATA_LANGUAGE,
  provideRepositoryUrl,
} from '@geonetwork-ui/api/repository'
import {
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  WEB_COMPONENT_EMBEDDER_URL,
} from '@geonetwork-ui/feature/record'
import { THUMBNAIL_PLACEHOLDER } from '@geonetwork-ui/ui/elements'
import { LANGUAGES_LIST } from '@geonetwork-ui/ui/catalog'
import {
  FILTER_GEOMETRY,
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '@geonetwork-ui/feature/search'
import {
  DefaultRouterModule,
  ROUTE_PARAMS,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_REUSE,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
  RouterService,
} from '@geonetwork-ui/feature/router'
import {
  ORGANIZATION_PAGE_URL_TOKEN,
  ORGANIZATION_URL_TOKEN,
} from '@geonetwork-ui/feature/catalog'
import {
  BASEMAP_LAYERS,
  DO_NOT_USE_DEFAULT_BASEMAP,
  MAP_VIEW_CONSTRAINTS,
} from '@geonetwork-ui/ui/map'
import {
  MAX_FEATURE_COUNT,
  REUSE_FORM_URL,
} from './record/record-data-preview/record-data-preview.component'
import { DatahubRouterService } from './router/datahub-router.service'
import { SearchPageComponent } from './home/search/search-page/search-page.component'
import { RecordPageComponent } from './record/record-page/record-page.component'
import { OrganizationPageComponent } from './organization/organization-page/organization-page.component'

/**
 * These providers are separate because they are environment providers (not useable at Component-level)
 */
export const DATAHUB_ROUTER_PROVIDERS = makeEnvironmentProviders([
  importProvidersFrom(
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: RecordPageComponent,
      serviceRouteComponent: RecordPageComponent,
      reuseRouteComponent: RecordPageComponent,
      organizationRouteComponent: OrganizationPageComponent,
    })
  ),
  { provide: RouterService, useClass: DatahubRouterService },
])

/**
 * These providers translate a loaded config from the `@geonetwork-ui/util/app-config` module
 * into DI token values used throughout the Datahub app
 */
export const DATAHUB_CONFIG_PROVIDERS: Array<Provider> = [
  provideRepositoryUrl(() => getGlobalConfig().GN4_API_URL),
  {
    provide: PROXY_PATH,
    useFactory: () => getGlobalConfig().PROXY_PATH,
  },
  {
    provide: LOGIN_URL,
    useFactory: () => getGlobalConfig().LOGIN_URL,
  },
  {
    provide: WEB_COMPONENT_EMBEDDER_URL,
    useFactory: () => getGlobalConfig().WEB_COMPONENT_EMBEDDER_URL,
  },
  {
    provide: METADATA_LANGUAGE,
    useFactory: () => getGlobalConfig().METADATA_LANGUAGE,
  },
  {
    provide: THUMBNAIL_PLACEHOLDER,
    useFactory: () => getThemeConfig().THUMBNAIL_PLACEHOLDER,
  },
  {
    provide: LANGUAGES_LIST,
    useFactory: () => getGlobalConfig().LANGUAGES,
  },
  {
    provide: FILTER_GEOMETRY,
    useFactory: () => {
      if (getOptionalSearchConfig()?.FILTER_GEOMETRY_DATA) {
        return Promise.resolve(
          JSON.parse(getOptionalSearchConfig().FILTER_GEOMETRY_DATA)
        ).then(getGeometryFromGeoJSON)
      }
      if (getOptionalSearchConfig()?.FILTER_GEOMETRY_URL) {
        return fetch(getOptionalSearchConfig().FILTER_GEOMETRY_URL)
          .then((resp) => resp.json())
          .then(getGeometryFromGeoJSON)
          .catch(() =>
            console.log(
              'No spatial filter was applied since a valid geometry could not be found'
            )
          )
      }
      return null
    },
  },
  {
    provide: RECORD_DATASET_URL_TOKEN,
    useValue: `${ROUTER_ROUTE_DATASET}/\${uuid}`,
  },
  {
    provide: RECORD_SERVICE_URL_TOKEN,
    useValue: `${ROUTER_ROUTE_SERVICE}/\${uuid}`,
  },
  {
    provide: RECORD_REUSE_URL_TOKEN,
    useValue: `${ROUTER_ROUTE_REUSE}/\${uuid}`,
  },
  {
    provide: ORGANIZATION_PAGE_URL_TOKEN,
    useValue: `${ROUTER_ROUTE_ORGANIZATION}/\${name}`,
  },
  {
    provide: ORGANIZATION_URL_TOKEN,
    useValue: `${ROUTER_ROUTE_SEARCH}?${ROUTE_PARAMS.PUBLISHER}=\${name}`,
  },
  {
    provide: DO_NOT_USE_DEFAULT_BASEMAP,
    useFactory: () => getOptionalMapConfig()?.DO_NOT_USE_DEFAULT_BASEMAP,
  },
  {
    provide: BASEMAP_LAYERS,
    useFactory: () =>
      getOptionalMapConfig()?.MAP_LAYERS.map(getMapContextLayerFromConfig) ??
      [],
  },
  {
    provide: MAP_VIEW_CONSTRAINTS,
    useFactory: () => ({
      maxExtent: getOptionalMapConfig()?.MAX_EXTENT,
      maxZoom: getOptionalMapConfig()?.MAX_ZOOM,
    }),
  },
  {
    provide: MAX_FEATURE_COUNT,
    useFactory: () => getOptionalMapConfig()?.MAX_FEATURE_COUNT,
  },
  {
    provide: EXTERNAL_VIEWER_URL_TEMPLATE,
    useFactory: () => getOptionalMapConfig()?.EXTERNAL_VIEWER_URL_TEMPLATE,
  },
  {
    provide: EXTERNAL_VIEWER_OPEN_NEW_TAB,
    useFactory: () => getOptionalMapConfig()?.EXTERNAL_VIEWER_OPEN_NEW_TAB,
  },
  {
    provide: REUSE_FORM_URL,
    useFactory: () => getGlobalConfig().REUSE_FORM_URL,
  },
]
