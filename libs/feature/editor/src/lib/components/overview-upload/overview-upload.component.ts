import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { FormControl } from '@angular/forms'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-overview-upload',
  standalone: true,
  imports: [CommonModule, UiInputsModule],
  templateUrl: './overview-upload.component.html',
  styleUrls: ['./overview-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewUploadComponent implements OnInit {
  @Input() metadataUuid: string
  @Input() formControl!: FormControl
  @Output() overViewChange = new EventEmitter<GraphicOverview | null>()

  imageAltText: string
  resourceUrl: string

  constructor(
    private recordsApiService: RecordsApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recordsApiService
      .getAllResources(this.metadataUuid)
      .subscribe((resources) => {
        this.imageAltText = resources[0]?.filename
        this.resourceUrl = resources[0]?.url

        this.resourceUrl = this.formControl.value?.[0]?.url.href
        this.imageAltText = this.formControl.value?.[0]?.description

        this.cd.markForCheck()
      })
  }

  handleFileChange(file: File) {
    this.recordsApiService
      .putResource(this.metadataUuid, file, 'public')
      .subscribe((resource) => {
        this.imageAltText = resource.filename
        this.resourceUrl = resource.url

        this.overViewChange.emit({
          url: new URL(resource.url),
          description: resource.filename,
        })

        this.cd.markForCheck()
      })
  }

  handleUrlChange(url: string) {
    this.recordsApiService
      .putResourceFromURL(this.metadataUuid, url, 'public')
      .subscribe((resource) => {
        this.imageAltText = resource.filename
        this.resourceUrl = resource.url

        this.overViewChange.emit({
          url: new URL(resource.url),
          description: resource.filename,
        })

        this.cd.markForCheck()
      })
  }

  handleDelete() {
    this.recordsApiService
      .delResource(this.metadataUuid, this.imageAltText)
      .subscribe(() => {
        this.imageAltText = null
        this.resourceUrl = null

        this.overViewChange.emit(null)

        this.cd.markForCheck()
      })
  }
}
