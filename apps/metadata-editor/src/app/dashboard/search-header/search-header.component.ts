import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core'
import { FuzzySearchComponent } from '@geonetwork-ui/feature/search'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { Router } from '@angular/router'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FuzzySearchComponent],
})
export class SearchHeaderComponent {
  private avatarService = inject(AvatarServiceInterface)
  private router = inject(Router)

  public placeholder$ = this.avatarService.getPlaceholder()
  activeBtn = false
  @Output() isSearchActive = new EventEmitter<boolean>()

  handleItemSelection(item: CatalogRecord) {
    this.router.navigate(['edit', item.uniqueIdentifier])
  }

  handleSearchActive(event: boolean) {
    this.isSearchActive.emit(event)
  }
}
