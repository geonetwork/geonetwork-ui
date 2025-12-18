import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core'
import {
  DataViewPermalinkComponent,
  WEB_COMPONENT_EMBEDDER_URL,
} from '../data-view-permalink/data-view-permalink.component.js'
import { MatTabsModule } from '@angular/material/tabs'

import { DataViewWebComponentComponent } from '../data-view-web-component/data-view-web-component.component.js'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-data-view-share',
  templateUrl: './data-view-share.component.html',
  styleUrls: ['./data-view-share.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    DataViewPermalinkComponent,
    DataViewWebComponentComponent,
    TranslateDirective,
  ],
  standalone: true,
})
export class DataViewShareComponent {
  protected wcEmbedderBaseUrl = inject(WEB_COMPONENT_EMBEDDER_URL, {
    optional: true,
  })

  private _viewType: string

  @Input()
  set viewType(value: string) {
    this._viewType = value
  }

  get viewType(): string {
    return this._viewType
  }
}
