import { ChangeDetectionStrategy, Component } from '@angular/core'
import { APPLICATION_CONFIG } from '../../app.config'

@Component({
  selector: 'datahub-catalog-title',
  templateUrl: './catalog-title.component.html',
  styleUrls: ['./catalog-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogTitleComponent {
  html = APPLICATION_CONFIG.catalogTitleHtml
}
