import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { LetDirective } from '@ngrx/component'
import {
  FeatureSearchModule,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateModule } from '@ngx-translate/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FeatureSearchModule,
    MatIconModule,
    CommonModule,
    LetDirective,
    UiElementsModule,
    TranslateModule,
  ],
})
export class SearchHeaderComponent {
  public placeholder$ = this.avatarService.getPlaceholder()
  activeBtn = false

  constructor(
    public platformService: PlatformServiceInterface,
    private avatarService: AvatarServiceInterface,
    private searchService: SearchService,
    private routerFacade: RouterFacade
  ) {}

  handleItemSelection(item: CatalogRecord) {
    this.searchService.updateFilters({ any: item.title })
  }
}
