import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'datahub-organisations-page',
  templateUrl: './organisations-page.component.html',
  styleUrls: ['./organisations-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
