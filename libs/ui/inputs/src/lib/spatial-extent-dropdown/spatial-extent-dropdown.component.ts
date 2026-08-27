import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core'
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayModule,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'

import { ButtonComponent } from '../button/button.component'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  iconoirCheckCircle,
  iconoirImport,
  iconoirSquareDashed,
  iconoirTrash,
} from '@ng-icons/iconoir'
import {
  matClose,
  matExpandLess,
  matExpandMore,
} from '@ng-icons/material-icons/baseline'
import { TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { PopoverComponent } from '@geonetwork-ui/ui/widgets'
import {
  BoundingBox,
  getGeometryBoundingBox,
  getGeometryFromGeoJSON,
  isFileExtensionValid,
  megabytesToBytes,
  propagateToDocumentOnly,
  readFileAsText,
} from '@geonetwork-ui/util/shared'

const ACCEPTED_FILE_EXTENSIONS = ['.json', '.geojson']
const MAX_FILE_SIZE_MB = 2

marker('search.filters.spatialExtent.import')
marker('search.filters.spatialExtent.helpText')
marker('search.filters.spatialExtent.bboxPrefix')
marker('search.filters.spatialExtent.error.title')
marker('search.filters.spatialExtent.error.invalidFormat')
marker('search.filters.spatialExtent.error.fileTooLarge')
marker('search.filters.spatialExtent.error.noGeometry')

@Component({
  selector: 'gn-ui-spatial-extent-dropdown',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIcon,
    OverlayModule,
    PopoverComponent,
    TranslatePipe,
  ],
  providers: [
    provideIcons({
      iconoirCheckCircle,
      iconoirImport,
      iconoirSquareDashed,
      iconoirTrash,
      matClose,
      matExpandLess,
      matExpandMore,
    }),
  ],
  templateUrl: './spatial-extent-dropdown.component.html',
  styleUrls: ['./spatial-extent-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialExtentDropdownComponent {
  private cd = inject(ChangeDetectorRef)
  private scrollStrategies = inject(ScrollStrategyOptions)

  @Input() title: string
  @Output() bboxChange = new EventEmitter<BoundingBox | null>()
  @Output() errorChange = new EventEmitter<string>()

  bbox: BoundingBox | null = null
  fileName: string | null = null

  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin
  @ViewChild(CdkConnectedOverlay) overlay: CdkConnectedOverlay
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>

  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ]
  scrollStrategy = this.scrollStrategies.reposition()
  overlayOpen = false
  overlayMinWidth = 'none'

  errorKey: string | null = null

  get hasSelection() {
    return !!this.bbox
  }

  get displayFileName() {
    return this.fileName ?? this.bbox?.join(', ') ?? ''
  }

  openOverlay() {
    this.overlayMinWidth =
      this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect()
        .width + 'px'
    this.overlayOpen = true
  }

  closeOverlay() {
    this.overlayOpen = false
  }

  toggleOverlay() {
    if (this.overlayOpen) {
      this.closeOverlay()
    } else {
      this.openOverlay()
    }
  }

  triggerFileSelection() {
    this.fileInputRef.nativeElement.click()
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    input.value = ''
    if (file) {
      this.handleFile(file)
    }
  }

  removeSelection(event: Event) {
    this.bbox = null
    this.fileName = null
    this.errorKey = null
    this.bboxChange.emit(null)
    propagateToDocumentOnly(event)
  }

  private setError(errorKey: string) {
    this.errorKey = errorKey
    this.errorChange.emit(errorKey)
  }

  private async handleFile(file: File) {
    this.errorKey = null
    if (!isFileExtensionValid(file.name, ACCEPTED_FILE_EXTENSIONS)) {
      this.setError('search.filters.spatialExtent.error.invalidFormat')
      return
    }
    if (file.size > megabytesToBytes(MAX_FILE_SIZE_MB)) {
      this.setError('search.filters.spatialExtent.error.fileTooLarge')
      return
    }
    try {
      const content = await readFileAsText(file)
      this.handleFileContent(content, file.name)
    } catch {
      this.setError('search.filters.spatialExtent.error.invalidFormat')
    }
    this.cd.markForCheck()
  }

  private handleFileContent(content: string, fileName: string) {
    let parsed = null
    try {
      parsed = JSON.parse(content)
    } catch {
      this.setError('search.filters.spatialExtent.error.invalidFormat')
      return
    }
    const geometry = getGeometryFromGeoJSON(parsed)
    if (!geometry) {
      this.setError('search.filters.spatialExtent.error.noGeometry')
      return
    }
    const bbox = getGeometryBoundingBox(geometry)
    this.bbox = bbox
    this.fileName = fileName
    this.bboxChange.emit(bbox)
  }
}
