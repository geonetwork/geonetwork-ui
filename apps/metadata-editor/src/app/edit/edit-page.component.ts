import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EditorService } from '@geonetwork-ui/feature/editor'

@Component({
  selector: 'md-editor-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private editorService: EditorService
  ) {}

  ngOnInit(): void {
    const currentRecord = this.route.snapshot.data['record']
    this.editorService.setCurrentRecord(currentRecord)
  }
}
