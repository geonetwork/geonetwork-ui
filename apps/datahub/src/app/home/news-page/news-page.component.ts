import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'datahub-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
