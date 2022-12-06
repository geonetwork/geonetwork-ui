import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'geonetwork-ui-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {}
