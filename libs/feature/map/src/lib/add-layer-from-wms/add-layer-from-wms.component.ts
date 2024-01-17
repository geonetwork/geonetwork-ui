import { Component, ChangeDetectorRef, OnInit } from '@angular/core'
import { WmsEndpoint, WmsLayerSummary } from '@camptocamp/ogc-client'
import { MapFacade } from '../+state/map.facade'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
} from '../map-context/map-context.model'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-add-layer-from-wms',
  templateUrl: './add-layer-from-wms.component.html',
  styleUrls: ['./add-layer-from-wms.component.css'],
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

  addLayer(layer: WmsLayerSummary) {
    const layerToAdd: MapContextLayerModel = {
      name: layer.name,
      url: this.wmsUrl.toString(),
      type: MapContextLayerTypeEnum.WMS,
    }
    this.mapFacade.addLayer({ ...layerToAdd, title: layer.title })
  }
}
