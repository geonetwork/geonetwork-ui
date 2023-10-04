import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { FieldsService, SearchFacade } from '@geonetwork-ui/feature/search'
import { AuthService } from '@geonetwork-ui/api/repository/gn4'
import { EditorRouterService } from '../../router.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'md-editor-my-records',
  templateUrl: './my-records.component.html',
  styleUrls: ['./my-records.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyRecordsComponent implements OnInit, OnDestroy {
  private sub: Subscription
  private ownerId: string

  constructor(
    public fieldsService: FieldsService,
    public searchFacade: SearchFacade,
    private authService: AuthService,
    private router: EditorRouterService
  ) {}

  ngOnInit() {
    this.searchFacade.resetSearch()
    this.sub = this.authService.user$.subscribe((user) => {
      this.ownerId = user.id
      this.fieldsService
        .buildFiltersFromFieldValues({ owner: user.id })
        .subscribe((filters) => {
          this.searchFacade.updateFilters(filters)
        })
    })
  }

  getDatahubUrl(): string {
    const url = new URL(
      `${this.router.getDatahubSearchRoute()}`,
      this.router.getDatahubSearchRoute().startsWith('http')
        ? this.router.getDatahubSearchRoute()
        : window.location.toString()
    )
    url.searchParams.append('owner', this.ownerId)
    return url.toString()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
