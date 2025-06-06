import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
} from '@angular/core'
import {
  DataViewPermalinkComponent,
  WEB_COMPONENT_EMBEDDER_URL,
} from '../data-view-permalink/data-view-permalink.component'
import { MatTabsModule } from '@angular/material/tabs'
import { CommonModule } from '@angular/common'
import { DataViewWebComponentComponent } from '../data-view-web-component/data-view-web-component.component'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-data-view-share',
  templateUrl: './data-view-share.component.html',
  styleUrls: ['./data-view-share.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTabsModule,
    DataViewPermalinkComponent,
    DataViewWebComponentComponent,
    TranslateDirective,
  ],
  standalone: true,
})
export class DataViewShareComponent {
  private _viewType: string

  @Input()
  set viewType(value: string) {
    this._viewType = value
  }

  get viewType(): string {
    return this._viewType
  }
  constructor(
    @Optional()
    @Inject(WEB_COMPONENT_EMBEDDER_URL)
    protected wcEmbedderBaseUrl: string
  ) {}
}
