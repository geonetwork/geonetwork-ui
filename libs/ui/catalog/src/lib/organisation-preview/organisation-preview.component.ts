import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Organisation } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-organisation-preview',
  templateUrl: './organisation-preview.component.html',
  styleUrls: ['./organisation-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationPreviewComponent {
  @Input() organisation: Organisation
  @Output() clickedOrganisation = new EventEmitter<Organisation>()

  clickOrganisation() {
    this.clickedOrganisation.emit(this.organisation)
  }
}
