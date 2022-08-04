import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { OrganisationsService } from '../organisations/organisations.service'

@Component({
  selector: 'gn-ui-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFiguresComponent {
  constructor(private organisationsService: OrganisationsService) {}

  organisationsCountLabel$: Observable<string> = this.organisationsService
    .countOrganisations()
    .pipe(map((organisations) => organisations.toString()))
}
