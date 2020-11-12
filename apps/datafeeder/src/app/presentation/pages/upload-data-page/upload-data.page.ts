import { Component, OnInit } from '@angular/core'
import { LogService } from '@lib/common'
import { UploadData } from '../../components/upload-data/upload-data.component'
import {marker} from '@biesbjerg/ngx-translate-extract-marker'

marker('Upload your data')

@Component({
  selector: 'app-upload-data-page',
  templateUrl: './upload-data.page.html',
  styleUrls: ['./upload-data.page.css'],
})
export class UploadDataPageComponent implements OnInit {
  constructor(private logService: LogService) {}

  ngOnInit(): void {}

  handleUploadData(uploadData: UploadData) {
    this.logService.log(JSON.stringify(uploadData))
  }
}
