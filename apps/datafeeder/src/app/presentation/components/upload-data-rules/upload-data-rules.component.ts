import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-upload-data-rules',
  templateUrl: './upload-data-rules.component.html',
  styleUrls: ['./upload-data-rules.component.css'],
})
export class UploadDataRulesComponent implements OnInit {
  @Input() maxFileSize = 30
  @Input() acceptedFileFormats = ['SHP', 'GeoJSON', 'GeoPackage', 'Spatialite']

  constructor() {}

  ngOnInit(): void {}
}
