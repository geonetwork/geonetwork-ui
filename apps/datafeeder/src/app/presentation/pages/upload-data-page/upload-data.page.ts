import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  UploadDataError,
  UploadDataErrorType,
} from '../../components/svg/upload-data-error-dialog/upload-data-error-dialog.component'
import SETTINGS from '../../../../settings'
import { parseSizeAsMb } from './size.utils'

marker('datafeeder.upload.error.title.analysis')
marker('datafeeder.upload.error.subtitle.analysis')

@Component({
  selector: 'gn-ui-upload-data-page',
  templateUrl: './upload-data.page.html',
  styleUrls: ['./upload-data.page.css'],
})
export class UploadDataPageComponent implements OnInit {
  error: UploadDataError
  get maxFileSizeMb() {
    return parseSizeAsMb(SETTINGS.maxFileUploadSize)
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if ('error' in params) {
        this.error = {
          title: 'datafeeder.upload.error.title.analysis',
          subtitle: 'datafeeder.upload.error.subtitle.analysis',
          type: UploadDataErrorType.ANALYSIS,
        }
      }
      // Remove error param from QS, without reloading
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {},
      })
    })
  }

  onUploadError(error: UploadDataError) {
    this.error = error
  }
  onJobIdGet(jobId: string) {
    this.router.navigate(['/', jobId])
  }
}
