import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core'
import { LetDirective } from '@ngrx/component'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { TranslateModule } from '@ngx-translate/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { Router } from '@angular/router'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FeatureSearchModule,
    CommonModule,
    LetDirective,
    UiElementsModule,
    TranslateModule,
  ],
})
export class SearchHeaderComponent {
  public placeholder$ = this.avatarService.getPlaceholder()
  activeBtn = false
  @Output() isSearchActive = new EventEmitter<boolean>()

  constructor(
    private avatarService: AvatarServiceInterface,
    private router: Router
  ) {}

  handleItemSelection(item: CatalogRecord) {
    this.router.navigate(['edit', item.uniqueIdentifier])
  }

  handleSearchActive(event: boolean) {
    this.isSearchActive.emit(event)
  }
}
