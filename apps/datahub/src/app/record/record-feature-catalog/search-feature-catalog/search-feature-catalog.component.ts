import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-search-feature-catalog',
  templateUrl: './search-feature-catalog.component.html',
  styleUrls: ['./search-feature-catalog.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class SearchFeatureCatalogComponent {
  // Vous pouvez ajouter ici la logique pour les compteurs si nécessaire
}
