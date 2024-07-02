import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
} from '@angular/core'
import { WEB_COMPONENT_EMBEDDER_URL } from '../data-view-permalink/data-view-permalink.component'

@Component({
  selector: 'gn-ui-data-view-share',
  templateUrl: './data-view-share.component.html',
  styleUrls: ['./data-view-share.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
