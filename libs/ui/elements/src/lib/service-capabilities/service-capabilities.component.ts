import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { getLayers } from '@geonetwork-ui/util/shared'
import { ButtonComponent, TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { iconoirSearch } from '@ng-icons/iconoir'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { matInfoOutline } from '@ng-icons/material-icons/outline'
import {
  PopoverComponent,
  SpinningLoaderComponent,
} from '@geonetwork-ui/ui/widgets'
import {
  WfsFeatureTypeFull,
  WmsLayerFull,
  WmtsLayer,
} from '@camptocamp/ogc-client'

marker(`service.metadata.search`)

const capabilitiesKeys = [
  { key: 'title', displayName: 'Title' },
  { key: 'abstract', displayName: 'Abstract' },
  { key: 'name', displayName: 'Name' },
  { key: 'defaultCrs', displayName: 'Default CRS' },
  { key: 'availableCrs', displayName: 'Available CRS' },
  { key: 'otherCrs', displayName: 'Other CRS' },
  { key: 'objectCount', displayName: 'Object Count' },
  { key: 'geometryName', displayName: 'Geometry Name' },
  { key: 'geometryType', displayName: 'Geometry Type' },
  { key: 'keywords', displayName: 'Keywords' },
  { key: 'outputFormats', displayName: 'Output Formats' },
  { key: 'resourceLinks', displayName: 'Resource Links' },
  { key: 'attribution', displayName: 'Attribution' },
] as const

@Component({
  selector: 'gn-ui-service-capabilities',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    TextInputComponent,
    NgIcon,
    PopoverComponent,
    SpinningLoaderComponent,
  ],
  viewProviders: [
    provideIcons({
      iconoirSearch,
      matInfoOutline,
    }),
  ],
  templateUrl: './service-capabilities.component.html',
  styleUrl: './service-capabilities.component.css',
})
export class ServiceCapabilitiesComponent implements OnInit {
  @Input() apiLinks = []
  availableLayers = []
  filteredLayers = []
  selectedLayer = null
  layerInformation = []
  searchQuery = ''
  loading = false

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadLayers()
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.searchQuery = input.value
    if (!input.value) {
      this.filteredLayers = this.availableLayers
    }
  }

  onSearchEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchLayers()
    }
  }

  async loadLayers() {
    if (
      this.apiLinks.length > 0 &&
      this.apiLinks[0].accessServiceProtocol !== 'ogcFeatures'
    ) {
      this.loading = true
      this.availableLayers = await getLayers(
        this.apiLinks[0].url.href,
        this.apiLinks[0].accessServiceProtocol
      )
      this.loading = false
      this.cdr.detectChanges()
      this.filteredLayers = this.availableLayers
    } else {
      this.availableLayers = []
    }
  }

  selectLayer(layer: WfsFeatureTypeFull | WmsLayerFull | WmtsLayer) {
    if (layer === this.selectedLayer) {
      this.selectedLayer = null
      this.layerInformation = []
      return
    }

    this.selectedLayer = layer
    const filteredInfo = []

    for (const { key, displayName } of capabilitiesKeys) {
      if (key in layer && layer[key]?.length) {
        filteredInfo.push({ displayName, value: layer[key] })
      }
    }

    this.layerInformation = filteredInfo
  }

  isList(value: string | string[]) {
    return Array.isArray(value)
  }

  searchLayers() {
    this.filteredLayers = this.availableLayers.filter((layer) => {
      const query = this.searchQuery.toLowerCase()
      if (layer.title) {
        return (
          layer.title.toLowerCase().includes(query) ||
          layer.abstract?.toLowerCase().includes(query)
        )
      } else {
        return layer.name.toLowerCase().includes(query)
      }
    })
  }

  getExtraClass(layerItem) {
    return layerItem.title === this.selectedLayer?.title
      ? `h-8 rounded-lg bg-primary-darker text-white hover:text-white`
      : `h-8 rounded-lg`
  }
}
