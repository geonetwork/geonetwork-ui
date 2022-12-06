import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'md-editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
