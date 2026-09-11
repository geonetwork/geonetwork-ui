import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'geonetwork-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  title = 'demo'
}
