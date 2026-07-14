import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { getGlobalConfig, loadAppConfig } from '@geonetwork-ui/util/app-config'
import { AsyncPipe } from '@angular/common'
import { Router } from '@angular/router'
import { Overlay, OverlayContainer } from '@angular/cdk/overlay'
import { WebcomponentOverlayContainer } from '../../webcomponent-overlay-container'
import { provideGn4 } from '@geonetwork-ui/api/repository'
import { copyFontFacesToDocument } from '../base.component'
import { standaloneConfigurationObject } from '../../configuration'
import { TranslateService } from '@ngx-translate/core'

// We need only the providers and app component from the Datahub so we work around this linting rule
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DATAHUB_CONFIG_PROVIDERS } from '@geonetwork-ui/apps/datahub/app.providers.ts'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppComponent } from '@geonetwork-ui/apps/datahub/app.component.ts'
import {
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '@geonetwork-ui/feature/search'
import {
  ROUTE_PARAMS,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_REUSE,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
} from '@geonetwork-ui/feature/router'
import {
  ORGANIZATION_PAGE_URL_TOKEN,
  ORGANIZATION_URL_TOKEN,
} from '@geonetwork-ui/feature/catalog'

@Component({
  selector: 'wc-gn-datahub',
  templateUrl: './gn-datahub.component.html',
  styleUrl: './gn-datahub.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    Overlay,
    {
      provide: OverlayContainer,
      useClass: WebcomponentOverlayContainer,
    },
    provideGn4({ disableAuth: true }),
    DATAHUB_CONFIG_PROVIDERS,
    // we're overriding the URL providers so that they work with our hash-based navigation
    // TODO: rely on the router for generating these links!
    {
      provide: RECORD_DATASET_URL_TOKEN,
      useValue: `#/${ROUTER_ROUTE_DATASET}/\${uuid}`,
    },
    {
      provide: RECORD_SERVICE_URL_TOKEN,
      useValue: `#/${ROUTER_ROUTE_SERVICE}/\${uuid}`,
    },
    {
      provide: RECORD_REUSE_URL_TOKEN,
      useValue: `#/${ROUTER_ROUTE_REUSE}/\${uuid}`,
    },
    {
      provide: ORGANIZATION_PAGE_URL_TOKEN,
      useValue: `#/${ROUTER_ROUTE_ORGANIZATION}/\${name}`,
    },
    {
      provide: ORGANIZATION_URL_TOKEN,
      useValue: `#/${ROUTER_ROUTE_SEARCH}?${ROUTE_PARAMS.PUBLISHER}=\${name}`,
    },
  ],
  standalone: true,
  imports: [AppComponent, AsyncPipe],
})
export class GnDatahubComponent implements OnInit {
  @Input() configUrl: string
  configReady$: Promise<boolean>
  router = inject(Router)
  injector = inject(Injector)
  translate = inject(TranslateService)

  ngOnInit() {
    const elementRef = this.injector.get(ElementRef)
    const overlayContainer = this.injector.get(
      OverlayContainer
    ) as WebcomponentOverlayContainer
    overlayContainer.setRoot(elementRef.nativeElement.shadowRoot)

    copyFontFacesToDocument(this.injector.get(ElementRef).nativeElement)

    this.translate.use(this.translate.getBrowserLang())

    // once the config is loaded, do initial navigation
    this.configReady$ = loadAppConfig(this.configUrl).then(() => {
      standaloneConfigurationObject.apiConfiguration.basePath =
        getGlobalConfig().GN4_API_URL
      this.router.initialNavigation()
      return true
    })
  }
}
