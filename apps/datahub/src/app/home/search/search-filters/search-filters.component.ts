import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core'
import {
  FeatureSearchModule,
  FieldsService,
  FilterDropdownComponent,
  SearchFacade,
  SearchService,
  SortByComponent,
} from '@geonetwork-ui/feature/search'
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'
import { Observable, switchMap } from 'rxjs'
import { map } from 'rxjs/operators'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  matAddOutline,
  matCloseOutline,
  matMoreHorizOutline,
  matRemoveOutline,
} from '@ng-icons/material-icons/outline'
import { getIsMobile } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    FeatureSearchModule,
    ButtonComponent,
    CheckToggleComponent,
    TranslatePipe,
    TranslateDirective,
    FilterDropdownComponent,
    SortByComponent,
  ],
  providers: [
    provideIcons({
      matRemoveOutline,
      matMoreHorizOutline,
      matAddOutline,
      matCloseOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class SearchFiltersComponent implements OnInit {
  @ViewChildren(FilterDropdownComponent)
  filters: QueryList<FilterDropdownComponent>
  searchConfig: { fieldName: string; title: string }[]
  isOpen = false
  @Input() isQualitySortable = false
  userId: string
  myRecordsFilterEnabled$: Observable<boolean> =
    this.searchFacade.searchFilters$.pipe(
      switchMap((filters) => {
        return this.fieldsService.readFieldValuesFromFilters(filters)
      }),
      map((fieldValues) =>
        fieldValues['owner'] && Array.isArray(fieldValues['owner'])
          ? fieldValues['owner'].length > 0
          : !!fieldValues['owner']
      )
    )

  isMobile$ = getIsMobile()

  constructor(
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService,
    private platformService: PlatformServiceInterface
  ) {}

  ngOnInit(): void {
    this.platformService.getMe().subscribe((user) => (this.userId = user?.id))
    this.searchConfig = (
      getOptionalSearchConfig().ADVANCED_FILTERS || [
        'organization',
        'format',
        'publicationYear',
        'topic',
        'isSpatial',
        'license',
      ]
    )
      .filter((adv_filter) => {
        if (adv_filter === 'resourceType') {
          console.warn(
            `WARNING: The resourceType filter is now deprecated, please use recordKind instead.`
          )
          console.warn(
            `WARNING: The resourceType filter does not return featureCatalog records anymore.`
          )
          return true
        } else if (this.fieldsService.supportedFields?.includes(adv_filter)) {
          return true
        } else {
          console.warn(
            `WARNING: the configuration file contains an unsupported filter field: '${adv_filter}'. This field will be ignored.`
          )
          return false
        }
      })
      .map((filter) => ({
        fieldName: filter,
        title: `search.filters.${filter}`,
      }))
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  toggleSpatialFilter(enabled: boolean) {
    this.searchFacade.setSpatialFilterEnabled(enabled)
  }

  toggleMyRecordsFilter(enabled: boolean) {
    this.fieldsService
      .buildFiltersFromFieldValues({ owner: enabled ? this.userId : [] })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  clearFilters() {
    const fieldNames = this.filters.map((component) => component.fieldName)
    const fieldValues = fieldNames.reduce(
      (prev, curr) => ({ ...prev, [curr]: [] }),
      {}
    )
    this.fieldsService
      .buildFiltersFromFieldValues(fieldValues)
      .subscribe((filters) => {
        this.searchService.updateFilters(filters)
      })
  }

  getClassForFilter(index: number) {
    return this.isOpen || index < 2 ? 'block' : 'hidden'
  }
}
