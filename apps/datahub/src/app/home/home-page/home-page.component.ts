import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'datahub-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
