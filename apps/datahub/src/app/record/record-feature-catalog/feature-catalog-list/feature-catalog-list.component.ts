import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-feature-catalog-list',
  templateUrl: './feature-catalog-list.component.html',
  styleUrls: ['./feature-catalog-list.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FeatureCatalogListComponent {}
