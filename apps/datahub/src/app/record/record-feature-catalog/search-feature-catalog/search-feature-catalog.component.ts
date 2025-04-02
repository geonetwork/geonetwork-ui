import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matSearchOutline } from '@ng-icons/material-icons/outline'
@Component({
  selector: 'datahub-search-feature-catalog',
  templateUrl: './search-feature-catalog.component.html',
  styleUrls: ['./search-feature-catalog.component.css'],
  standalone: true,
  imports: [CommonModule, NgIcon, TranslateModule],
  viewProviders: [provideIcons({ matSearchOutline })],
})
export class SearchFeatureCatalogComponent {
  //filtering logic TODO
}
