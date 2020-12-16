import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UploadDataError } from '../../components/svg/upload-data-error-dialog/upload-data-error-dialog.component'

@Component({
  selector: 'app-upload-data-page',
  templateUrl: './upload-data.page.html',
  styleUrls: ['./upload-data.page.css'],
})
export class UploadDataPageComponent implements OnInit {
  error: UploadDataError

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onUploadError(error: UploadDataError) {
    this.error = error
  }
  onJobIdGet(jobId: string) {
    this.router.navigate(['/', jobId])
  }
}
