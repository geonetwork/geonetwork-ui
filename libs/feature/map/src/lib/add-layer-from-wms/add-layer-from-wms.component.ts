import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { WmsEndpoint, WmsLayerSummary } from '@camptocamp/ogc-client'
import { MapFacade } from '../+state/map.facade'
import { firstValueFrom, Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { MapContextLayer } from '@geospatial-sdk/core'
import { ButtonComponent, TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-add-layer-from-wms',
  templateUrl: './add-layer-from-wms.component.html',
  styleUrls: ['./add-layer-from-wms.component.css'],
  standalone: true,
  imports: [
    TextInputComponent,
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    ButtonComponent,
  ],
})
export class AddLayerFromWmsComponent implements OnInit {
  wmsUrl = ''
  loading = false
  layers: WmsLayerSummary[] = []
  wmsEndpoint: WmsEndpoint | null = null
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

      if (this.wmsUrl.trim() === '') {
        this.layers = []
        return
      }

      this.wmsEndpoint = await new WmsEndpoint(this.wmsUrl).isReady()
      this.layers = this.wmsEndpoint.getLayers()
    } catch (error) {
      const err = error as Error
      this.layers = []
      this.errorMessage = 'Error loading layers: ' + err.message
    } finally {
      this.loading = false
      this.changeDetectorRef.markForCheck()
    }
  }

  async addLayer(layer: WmsLayerSummary) {
    const context = await firstValueFrom(this.mapFacade.context$)
    const layerToAdd: MapContextLayer = {
      name: layer.name,
      url: this.wmsUrl.toString(),
      type: 'wms',
      label: layer.title,
    }
    this.mapFacade.applyContext({
      ...context,
      layers: [...context.layers, layerToAdd],
    })
  }
}
