import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { WfsEndpoint, WfsFeatureTypeBrief } from '@camptocamp/ogc-client'
import { firstValueFrom, Subject } from 'rxjs'
import { MapFacade } from '../+state/map.facade'
import { debounceTime } from 'rxjs/operators'
import { MapContextLayer } from '@geospatial-sdk/core'
import { ButtonComponent, TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-add-layer-from-wfs',
  templateUrl: './add-layer-from-wfs.component.html',
  styleUrls: ['./add-layer-from-wfs.component.css'],
  standalone: true,
  imports: [
    TextInputComponent,
    ButtonComponent,
    TranslateDirective,
    TranslatePipe,
    CommonModule,
  ],
})
export class AddLayerFromWfsComponent implements OnInit {
  wfsUrl = ''
  loading = false
  layers: WfsFeatureTypeBrief[] = []
  wfsEndpoint: WfsEndpoint | null = null
  urlChange = new Subject<string>()
  errorMessage: string | null = null

  constructor(
    private mapFacade: MapFacade,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.urlChange.pipe(debounceTime(700)).subscribe(() => this.loadLayers())
  }

  async loadLayers() {
    this.errorMessage = null
    try {
      this.loading = true

      if (this.wfsUrl.trim() === '') {
        this.layers = []
        return
      }

      this.wfsEndpoint = await new WfsEndpoint(this.wfsUrl).isReady()
      this.layers = this.wfsEndpoint.getFeatureTypes()
      console.log(this.layers)
    } catch (error) {
      const err = error as Error
      this.layers = []
      this.errorMessage = 'Error loading layers: ' + err.message
    } finally {
      this.loading = false
      this.changeDetectorRef.markForCheck()
    }
  }

  async addLayer(layer: WfsFeatureTypeBrief) {
    const context = await firstValueFrom(this.mapFacade.context$)
    const layerToAdd: MapContextLayer = {
      featureType: layer.name,
      url: this.wfsUrl.toString(),
      type: 'wfs',
      label: layer.title,
    }
    this.mapFacade.applyContext({
      ...context,
      layers: [...context.layers, layerToAdd],
    })
  }
}
