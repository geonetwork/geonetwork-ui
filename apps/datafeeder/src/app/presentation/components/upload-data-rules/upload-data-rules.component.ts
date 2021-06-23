import { Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-upload-data-rules',
  templateUrl: './upload-data-rules.component.html',
  styleUrls: ['./upload-data-rules.component.css'],
})
export class UploadDataRulesComponent {
  @Input() maxFileSize = 30
  @Input() acceptedFileFormats = ['SHP', 'GeoJSON', 'GeoPackage', 'Spatialite']
}
