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
import { loadAppConfig } from '@geonetwork-ui/util/app-config'

// We need only the providers and app component from the Datahub so we work around this linting rule
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DATAHUB_CONFIG_PROVIDERS } from '@geonetwork-ui/apps/datahub/app.providers.ts'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppComponent } from '@geonetwork-ui/apps/datahub/app.component.ts'
import { AsyncPipe } from '@angular/common'
import { Router } from '@angular/router'
import { OverlayContainer } from '@angular/cdk/overlay'
import { WebcomponentOverlayContainer } from '../../webcomponent-overlay-container'
import { provideGn4 } from '@geonetwork-ui/api/repository'
import { copyFontFacesToDocument } from '../base.component'

@Component({
  selector: 'wc-gn-datahub',
  templateUrl: './gn-datahub.component.html',
  styleUrl: './gn-datahub.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: OverlayContainer,
      useClass: WebcomponentOverlayContainer,
    },
    provideGn4({ disableAuth: true }),
    DATAHUB_CONFIG_PROVIDERS,
  ],
  standalone: true,
  imports: [AppComponent, AsyncPipe],
})
export class GnDatahubComponent implements OnInit {
  @Input() configUrl: string
  configReady$: Promise<boolean>
  router = inject(Router)
  injector = inject(Injector)

  ngOnInit() {
    const elementRef = this.injector.get(ElementRef)
    const overlayContainer = this.injector.get(
      OverlayContainer
    ) as WebcomponentOverlayContainer
    overlayContainer.setRoot(elementRef.nativeElement.shadowRoot)

    copyFontFacesToDocument(this.injector.get(ElementRef).nativeElement)

    // once the config is loaded, do initial navigation
    this.configReady$ = loadAppConfig(this.configUrl).then(() => {
      this.router.initialNavigation()
      return true
    })
  }
}
