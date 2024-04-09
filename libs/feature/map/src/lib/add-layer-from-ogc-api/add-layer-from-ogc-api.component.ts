import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { OgcApiEndpoint } from '@camptocamp/ogc-client'
import { Subject, debounceTime } from 'rxjs'
import { MapFacade } from '../+state/map.facade'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
} from '../map-context/map-context.model'

@Component({
  selector: 'gn-ui-add-layer-from-ogc-api',
  templateUrl: './add-layer-from-ogc-api.component.html',
  styleUrls: ['./add-layer-from-ogc-api.component.css'],
})
export class AddLayerFromOgcApiComponent implements OnInit {
  urlChange = new Subject<string>()
  ogcUrl = ''
  layerUrl = ''
  loading = false
  layers: string[] = []
  ogcEndpoint: OgcApiEndpoint = null
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
      if (this.ogcUrl.trim() === '') {
        this.layers = []
        return
      }
      this.ogcEndpoint = await new OgcApiEndpoint(this.ogcUrl)

      // Currently only supports feature collections
      this.layers = await this.ogcEndpoint.featureCollections
    } catch (error) {
      const err = error as Error
      this.layers = []
      this.errorMessage = 'Error loading layers: ' + err.message
    } finally {
      this.loading = false
      this.changeDetectorRef.markForCheck()
    }
  }

  async addLayer(layer) {
    this.layerUrl = await this.ogcEndpoint.getCollectionItemsUrl(layer)

    const layerToAdd: MapContextLayerModel = {
      name: layer,
      url: this.layerUrl,
      type: MapContextLayerTypeEnum.OGCAPI,
    }
    this.mapFacade.addLayer({ ...layerToAdd, title: layer })
  }
}
