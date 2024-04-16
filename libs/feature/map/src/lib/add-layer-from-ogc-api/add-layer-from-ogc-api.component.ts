import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core'
import { OgcApiEndpoint } from '@camptocamp/ogc-client'
import { Subject, debounceTime } from 'rxjs'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
} from '../map-context/map-context.model'
import { TranslateModule } from '@ngx-translate/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { MapLayer } from '../+state/map.models'

@Component({
  selector: 'gn-ui-add-layer-from-ogc-api',
  templateUrl: './add-layer-from-ogc-api.component.html',
  styleUrls: ['./add-layer-from-ogc-api.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, UiInputsModule],
})
export class AddLayerFromOgcApiComponent implements OnInit {
  @Input() ogcUrl: string
  @Output() layerAdded = new EventEmitter<MapLayer>()

  urlChange = new Subject<string>()
  layerUrl = ''
  loading = false
  layers: string[] = []
  ogcEndpoint: OgcApiEndpoint = null
  errorMessage: string | null = null

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.urlChange.pipe(debounceTime(700)).subscribe(() => {
      this.loadLayers()
      this.changeDetectorRef.detectChanges() // manually trigger change detection
    })
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

  async addLayer(layer: string) {
    this.layerUrl = await this.ogcEndpoint.getCollectionItemsUrl(layer)

    const layerToAdd: MapContextLayerModel = {
      name: layer,
      url: this.layerUrl,
      type: MapContextLayerTypeEnum.OGCAPI,
    }
    this.layerAdded.emit({ ...layerToAdd, title: layer })
  }
}
