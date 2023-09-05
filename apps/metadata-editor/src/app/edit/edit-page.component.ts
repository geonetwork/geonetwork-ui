import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EditorService } from '@geonetwork-ui/feature/editor'
import { RecordFormComponent } from '@geonetwork-ui/feature/editor'

@Component({
  selector: 'md-editor-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
  standalone: true,
  imports: [RecordFormComponent, CommonModule],
})
export class EditPageComponent implements OnInit {
  saving$ = this.editorService.saving$

  constructor(
    private route: ActivatedRoute,
    private editorService: EditorService
  ) {}

  ngOnInit(): void {
    const currentRecord = this.route.snapshot.data['record']
    this.editorService.setCurrentRecord(currentRecord)
  }

  saveRecord() {
    this.editorService.saveCurrentRecord().subscribe()
  }
}
