import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { AsyncPipe, NgIf } from '@angular/common'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgIf, ButtonComponent, MatIconModule, TranslateModule],
})
export class OrganizationDetailsComponent implements OnChanges {
  @Input() organization: Organization

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['organization'])
  }
}
