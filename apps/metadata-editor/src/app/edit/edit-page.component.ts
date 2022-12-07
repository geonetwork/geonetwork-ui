import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/metadata-converter'

@Component({
  selector: 'md-editor-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  currentRecord: CatalogRecord

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentRecord = this.route.snapshot.data['record']
  }
}
