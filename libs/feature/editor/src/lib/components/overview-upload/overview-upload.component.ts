import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

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

  resourceFileName: string
  resourceUrl: string

  constructor(
    private recordsApiService: RecordsApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recordsApiService
      .getAllResources(this.metadataUuid)
      .subscribe((resources) => {
        this.resourceFileName = resources[0]?.filename
        this.resourceUrl = resources[0]?.url
        this.cd.markForCheck()
      })
  }

  handleFileChange(file: File) {
    this.recordsApiService
      .putResource(this.metadataUuid, file, 'public')
      .subscribe((resource) => {
        this.resourceFileName = resource.filename
        this.resourceUrl = resource.url
        this.cd.markForCheck()
      })
  }

  handleUrlChange(url: string) {
    this.recordsApiService
      .putResourceFromURL(this.metadataUuid, url, 'public')
      .subscribe((resource) => {
        this.resourceFileName = resource.filename
        this.resourceUrl = resource.url
        this.cd.markForCheck()
      })
  }

  handleDelete() {
    this.recordsApiService
      .delResource(this.metadataUuid, this.resourceFileName)
      .subscribe(() => {
        this.resourceFileName = null
        this.resourceUrl = null
        this.cd.markForCheck()
      })
  }
}
