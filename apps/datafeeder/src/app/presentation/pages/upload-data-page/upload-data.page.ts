import { Component, OnInit } from '@angular/core'
import { UploadData } from '../../components/upload-data/upload-data.component'
import { of } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-upload-data-page',
  templateUrl: './upload-data.page.html',
  styleUrls: ['./upload-data.page.css'],
})
export class UploadDataPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleUploadData(uploadData: UploadData) {
    if (uploadData.error) {
      return
    }

    of(10).subscribe((result) => {
      this.router.navigate(['/', result])
    })
  }
}
