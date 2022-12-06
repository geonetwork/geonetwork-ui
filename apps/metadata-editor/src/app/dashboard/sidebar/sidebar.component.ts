import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'geonetwork-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
