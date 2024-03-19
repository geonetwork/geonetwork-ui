import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EditorFacade, EditorService } from '@geonetwork-ui/feature/editor'
import { RecordFormComponent } from '@geonetwork-ui/feature/editor'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { PublishButtonComponent } from './components/publish-button/publish-button.component'

@Component({
  selector: 'md-editor-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
  standalone: true,
  imports: [
    RecordFormComponent,
    CommonModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    PublishButtonComponent,
  ],
})
export class EditPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private facade: EditorFacade) {}

  ngOnInit(): void {
    const currentRecord = this.route.snapshot.data['record']
    this.facade.openRecord(currentRecord)
  }
}
