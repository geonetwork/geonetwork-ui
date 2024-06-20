import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { FormControl } from '@angular/forms'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'
import { Subject, takeUntil } from 'rxjs'

const extractFileNameFormUrl = (url: URL, metadataUuid: string): string => {
  const pattern = new RegExp(
    `records/${metadataUuid}/attachments/([^/?#]+)(?:[/?#]|$)`,
    'i'
  )
  const match = url.href.match(pattern)
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
export class OverviewUploadComponent implements OnInit, OnDestroy {
  @Input() metadataUuid: string
  @Input() formControl!: FormControl
  @Output() overviewChange = new EventEmitter<GraphicOverview | null>()

  imageAltText: string
  resourceUrl: URL

  private destroy$ = new Subject<void>()

  constructor(
    private recordsApiService: RecordsApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recordsApiService
      .getAllResources(this.metadataUuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resources) => {
          if (resources && resources.length > 0) {
            this.resourceUrl = new URL(resources[0]?.url)
            this.imageAltText = resources[0].filename
          } else if (this.formControl.value[0]) {
            this.resourceUrl = new URL(this.formControl.value[0].url.href)
            this.imageAltText = this.formControl.value[0].description
          } else {
            this.resourceUrl = null
            this.imageAltText = ''
          }

          this.cd.markForCheck()
        },
        error: this.errorHandle,
      })
  }

  handleFileChange(file: File) {
    this.recordsApiService
      .putResource(this.metadataUuid, file, 'public')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resource) => {
          this.resourceUrl = new URL(resource.url)
          this.imageAltText = resource.filename

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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resource) => {
          this.resourceUrl = new URL(resource.url)
          this.imageAltText = resource.filename

          this.overviewChange.emit({
            url: new URL(resource.url),
            description: resource.filename,
          })

          this.cd.markForCheck()
        },
        error: this.errorHandle,
      })
  }

  handleDelete() {
    const fileName = extractFileNameFormUrl(this.resourceUrl, this.metadataUuid)

    this.recordsApiService
      .delResource(this.metadataUuid, fileName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.imageAltText = null
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
    this.imageAltText = ''

    this.overviewChange.emit(null)

    this.cd.markForCheck()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
