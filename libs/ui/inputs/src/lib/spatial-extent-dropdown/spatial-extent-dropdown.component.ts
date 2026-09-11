import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import {
  BoundingBox,
  getGeometryBoundingBox,
  getGeometryFromGeoJSON,
  propagateToDocumentOnly,
  readFileAsText,
} from '@geonetwork-ui/util/shared'
import {
  DragAndDropFileInputComponent,
  DragAndDropFileInputError,
} from '../drag-and-drop-file-input/drag-and-drop-file-input.component'

marker('search.filters.spatialExtent.import')
marker('search.filters.spatialExtent.helpText')
marker('search.filters.spatialExtent.error.title')

const LABEL_FROM_FILE = marker('search.filters.spatialExtent.bboxFromFile')
const LABEL_FROM_FILE_DELETE = marker(
  'search.filters.spatialExtent.bboxFromFileDelete'
)
const LABEL_INITIAL = marker('search.filters.spatialExtent.bboxInitial')
const LABEL_INITIAL_DELETE = marker(
  'search.filters.spatialExtent.bboxInitialDelete'
)

export interface SpatialExtentDropdownError {
  key: string
  params?: Record<string, string | number>
}

@Component({
  selector: 'gn-ui-spatial-extent-dropdown',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIcon,
    OverlayModule,
    TranslatePipe,
    DragAndDropFileInputComponent,
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
  @Input() maxFileSizeMb: number | null = null
  @Input() set initialBbox(value: BoundingBox | null) {
    if (!this.bbox && value) {
      this.bbox = value
    }
  }

  @Output() bboxChange = new EventEmitter<BoundingBox | null>()
  @Output() errorChange = new EventEmitter<SpatialExtentDropdownError>()

  bbox: BoundingBox | null = null
  fileName = ''

  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin
  @ViewChild(CdkConnectedOverlay) overlay: CdkConnectedOverlay
  @ViewChild(DragAndDropFileInputComponent)
  fileInput: DragAndDropFileInputComponent

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

  get selectionLabelKey() {
    return this.fileName ? LABEL_FROM_FILE : LABEL_INITIAL
  }

  get selectionDeleteLabelKey() {
    return this.fileName ? LABEL_FROM_FILE_DELETE : LABEL_INITIAL_DELETE
  }

  get selectionLabelParams() {
    return { fileName: this.fileName }
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

  async handleFileSelected(file: File) {
    this.errorKey = null
    let content: string
    try {
      content = await readFileAsText(file)
      const parsed = JSON.parse(content)
      const geometry = getGeometryFromGeoJSON(parsed)
      if (!geometry) {
        this.setError(marker('search.filters.spatialExtent.error.noGeometry'))
        return
      }
      const bbox = getGeometryBoundingBox(geometry)
      this.bbox = bbox
      this.fileName = file.name
      this.bboxChange.emit(bbox)
      this.cd.markForCheck()
    } catch {
      this.setError(marker('search.filters.spatialExtent.error.invalidFormat'))
      return
    }
  }

  handleFileError(error: DragAndDropFileInputError) {
    if (error === 'file-too-large') {
      this.setError(marker('search.filters.spatialExtent.error.fileTooLarge'), {
        maxSize: this.maxFileSizeMb,
      })
    } else {
      this.setError(marker('search.filters.spatialExtent.error.invalidFormat'))
    }
  }

  private setError(errorKey: string, params?: Record<string, string | number>) {
    this.errorKey = errorKey
    this.errorChange.emit({ key: errorKey, params })
    this.cd.markForCheck()
  }

  removeSelection(event: Event) {
    this.bbox = null
    this.fileName = ''
    this.errorKey = null
    this.fileInput?.clear()
    this.bboxChange.emit(null)
    propagateToDocumentOnly(event)
  }
}
