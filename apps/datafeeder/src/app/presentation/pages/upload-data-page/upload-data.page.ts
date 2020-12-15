import { Component, OnInit } from '@angular/core'
import { UploadData } from '../../components/upload-data/upload-data.component'
import { of } from 'rxjs'
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

  handleUploadData(uploadData: UploadData) {
    if (uploadData.error) {
      this.error = uploadData.error
      return
    }

    of(10).subscribe((result) => {
      this.router.navigate(['/', result])
    })
  }
}
