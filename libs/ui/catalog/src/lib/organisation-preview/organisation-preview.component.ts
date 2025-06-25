import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { tablerFolderOpen } from '@ng-icons/tabler-icons'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-organisation-preview',
  templateUrl: './organisation-preview.component.html',
  styleUrls: ['./organisation-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThumbnailComponent, NgIcon, TranslateDirective],
  viewProviders: [
    provideIcons({
      tablerFolderOpen,
    }),
  ],
  standalone: true,
})
export class OrganisationPreviewComponent {
  @Input() organization: Organization
  @Input() organisationUrl: string
  @Output() clickedOrganisation = new EventEmitter<Organization>()

  clickOrganisation(event: Event) {
    event.preventDefault()
    this.clickedOrganisation.emit(this.organization)
  }
}
