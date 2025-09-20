import { ChangeDetectionStrategy, Component } from '@angular/core'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { KeyFiguresComponent } from './key-figures/key-figures.component'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  FeatureSearchModule,
  SearchStateContainerDirective,
} from '@geonetwork-ui/feature/search'
import { CommonModule } from '@angular/common'
import { LastCreatedComponent } from './last-created/last-created.component'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from '@geonetwork-ui/ui/search'

@Component({
  selector: 'datahub-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    KeyFiguresComponent,
    TranslatePipe,
    TranslateDirective,
    FeatureSearchModule,
    LastCreatedComponent,
    SearchStateContainerDirective,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DEFAULT_RESULTS_LAYOUT_CONFIG },
  ],
})
export class NewsPageComponent {
  getContactMail(): string {
    return getGlobalConfig().CONTACT_EMAIL
  }
}
