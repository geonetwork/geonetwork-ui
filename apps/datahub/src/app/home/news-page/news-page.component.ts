import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'datahub-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent {
  getContactMail(): string {
    return getGlobalConfig().CONTACT_EMAIL
  }
}
