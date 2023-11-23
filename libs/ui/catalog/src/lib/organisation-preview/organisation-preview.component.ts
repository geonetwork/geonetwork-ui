import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Organization } from 'libs/common/domain/src/lib/model/record'

@Component({
  selector: 'gn-ui-organisation-preview',
  templateUrl: './organisation-preview.component.html',
  styleUrls: ['./organisation-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationPreviewComponent {
  @Input() organisation: Organization
  @Input() organisationUrl: string
  @Output() clickedOrganisation = new EventEmitter<Organization>()

  clickOrganisation(event: Event) {
    event.preventDefault()
    this.clickedOrganisation.emit(this.organisation)
  }
}
