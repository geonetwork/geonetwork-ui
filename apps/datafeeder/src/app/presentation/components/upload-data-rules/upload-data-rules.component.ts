import { Component, OnInit } from '@angular/core'
import { UploadData } from '../upload-data/upload-data.component'
import { LogService } from '@lib/common'

@Component({
  selector: 'app-upload-data-rules',
  templateUrl: './upload-data-rules.component.html',
  styleUrls: ['./upload-data-rules.component.css'],
})
export class UploadDataRulesComponent implements OnInit {
  constructor(private logService: LogService) {}

  ngOnInit(): void {}
}
