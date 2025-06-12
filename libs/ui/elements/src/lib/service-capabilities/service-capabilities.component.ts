import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
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
import { matClose } from '@ng-icons/material-icons/baseline'

marker(`service.metadata.search`)
marker(`service.metadata.capabilities.title`)
marker(`service.metadata.capabilities.abstract`)
marker(`service.metadata.capabilities.name`)
marker(`service.metadata.capabilities.defaultCrs`)
marker(`service.metadata.capabilities.availableCrs`)
marker(`service.metadata.capabilities.otherCrs`)
marker(`service.metadata.capabilities.objectCount`)
marker(`service.metadata.capabilities.geometryName`)
marker(`service.metadata.capabilities.geometryType`)
marker(`service.metadata.capabilities.keywords`)
marker(`service.metadata.capabilities.outputFormats`)
marker(`service.metadata.capabilities.resourceLinks`)
marker(`service.metadata.capabilities.attribution`)

@Component({
  selector: 'gn-ui-service-capabilities',
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
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
      matClose,
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
  searchActive

  capabilitiesKeys = [
    'title',
    'abstract',
    'name',
    'defaultCrs',
    'availableCrs',
    'otherCrs',
    'objectCount',
    'geometryName',
    'geometryType',
    'keywords',
    'outputFormats',
    'resourceLinks',
    'attribution',
  ]

  constructor(
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadLayers()
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.searchQuery = input.value
    if (!input.value) {
      this.searchActive = false
      this.filteredLayers = this.availableLayers
    }
  }

  onSearchEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchActive = true
      this.searchLayers()
    }
  }

  clearSearch() {
    this.searchActive = false
    this.searchQuery = ''
    this.filteredLayers = this.availableLayers
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
    Object.keys(layer).map((key) => {
      if (this.capabilitiesKeys.includes(key)) {
        const displayName = this.translateService.instant(
          `service.metadata.capabilities.${key}`
        )
        if (key in layer && layer[key]?.length) {
          filteredInfo.push({ displayName, value: layer[key] })
        }
      }
    })

    this.layerInformation = filteredInfo
  }

  isList(value: string | string[]) {
    return Array.isArray(value)
  }

  getExtraInputClass() {
    if (this.searchActive) {
      return 'h-14 border rounded-lg border-primary text-primary focus:border-primary hover:border-primary'
    }
    return 'h-14 border rounded-lg'
  }

  searchLayers() {
    this.searchActive = true
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
    if (!this.filteredLayers.includes(this.selectedLayer)) {
      this.selectedLayer = null
      this.layerInformation = []
    }
  }

  getExtraClass(layerItem) {
    return layerItem === this.selectedLayer
      ? `h-8 rounded-lg bg-primary-darker text-white hover:text-primary-darker hover:bg-white`
      : `h-8 rounded-lg`
  }
}
