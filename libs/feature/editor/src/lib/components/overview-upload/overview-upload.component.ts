import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { FormControl } from '@angular/forms'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'

const extractFileNameFromUrl = (url: string): string => {
  const pattern = new RegExp(`attachments/([^/?#]+)(?:[/?#]|$)`, 'i')
  const match = url.match(pattern)
  return match ? match[1] : ''
}

@Component({
  selector: 'gn-ui-overview-upload',
  standalone: true,
  imports: [CommonModule, UiInputsModule],
  templateUrl: './overview-upload.component.html',
  styleUrls: ['./overview-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewUploadComponent implements OnInit, OnChanges {
  @Input() metadataUuid: string
  @Input() formControl!: FormControl
  @Output() overviewChange = new EventEmitter<GraphicOverview | null>()
  @Output() altTextChange: EventEmitter<string> = new EventEmitter()

  resourceAltText = '' // = ressourceFileName by default
  resourceFileName = ''
  resourceUrl: URL

  constructor(
    private recordsApiService: RecordsApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recordsApiService.getAllResources(this.metadataUuid).subscribe({
      next: (resources) => {
        if (resources && resources.length > 0) {
          this.resourceUrl = new URL(resources[0]?.url)
          this.resourceAltText =
            this.resourceAltText === ''
              ? resources[0].filename
              : this.resourceAltText
          this.resourceFileName = extractFileNameFromUrl(resources[0]?.url)
        } else {
          this.resourceUrl = null
          this.resourceAltText = ''
          this.resourceFileName = ''
        }

        this.cd.markForCheck()
      },
      error: this.errorHandle,
    })
  }

  handleFileChange(file: File) {
    this.recordsApiService
      .putResource(this.metadataUuid, file, 'public')
      .subscribe({
        next: (resource) => {
          this.resourceUrl = new URL(resource.url)
          this.resourceAltText = resource.filename

          this.overviewChange.emit({
            url: new URL(resource.url),
            description: resource.filename,
          })

          this.cd.markForCheck()
        },
        error: this.errorHandle,
      })
  }

  handleUrlChange(url: string) {
    this.recordsApiService
      .putResourceFromURL(this.metadataUuid, url, 'public')
      .subscribe({
        next: (resource) => {
          this.resourceUrl = new URL(resource.url)
          this.resourceAltText = resource.filename

          this.overviewChange.emit({
            url: new URL(resource.url),
            description: resource.filename,
          })

          this.cd.markForCheck()
        },
        error: this.errorHandle,
      })
  }

  handleAltTextChange(newAltText: string) {
    this.resourceAltText = newAltText

    this.overviewChange.emit({
      url: this.resourceUrl,
      description: this.resourceAltText,
    })
    this.cd.markForCheck()
  }

  handleDelete() {
    this.recordsApiService
      .delResource(this.metadataUuid, this.resourceFileName)
      .subscribe({
        next: () => {
          this.resourceAltText = null
          this.resourceUrl = null

          this.overviewChange.emit(null)

          this.cd.markForCheck()
        },
        error: this.errorHandle,
      })
  }

  private errorHandle = (error: never) => {
    console.error(error)

    this.resourceUrl = null
    this.resourceAltText = ''
    this.resourceFileName = ''

    this.overviewChange.emit(null)

    this.cd.markForCheck()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const overviewChanges = changes['formControl']
    if (
      overviewChanges &&
      overviewChanges.currentValue !== overviewChanges.previousValue
    ) {
      let overview: GraphicOverview
      if (
        overviewChanges.currentValue.value &&
        overviewChanges.currentValue.value.length > 0
      ) {
        overview = overviewChanges.currentValue.value[0] as GraphicOverview
      } else {
        return
      }
      if (overview.description && overview.description !== '') {
        this.resourceAltText = overview.description
        this.cd.markForCheck()
      }
    }
  }
}
