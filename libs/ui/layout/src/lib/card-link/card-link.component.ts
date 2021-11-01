import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'gn-ui-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardLinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
