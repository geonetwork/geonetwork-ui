import { Component, Input, OnInit } from '@angular/core'
import { UploadData } from '../upload-data/upload-data.component'
import { LogService } from '@lib/common'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('Accepted file formats')
marker('Maximum size is')

@Component({
  selector: 'app-upload-data-rules',
  templateUrl: './upload-data-rules.component.html',
  styleUrls: ['./upload-data-rules.component.css'],
})
export class UploadDataRulesComponent implements OnInit {
  @Input() maxFileSize = '30MB'
  @Input() acceptedFileFormats = ['SHP', 'GeoJSON', 'GeoPackage', 'Spatialite']

  constructor(private logService: LogService) {}

  ngOnInit(): void {}

  getFormattedFormats(): string[][] {
    return this.acceptedFileFormats.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2))
      }
      return result
    }, [])
  }
}
