import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import {
  FeatureSearchModule,
  FieldsService,
  ResultsTableContainerComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { Observable, Subscription } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { ActivatedRoute, Router } from '@angular/router'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { allSearchFields } from '../all-records/all-records.component'
import { RecordsCountComponent } from '../records-count/records-count.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { ImportRecordComponent } from '@geonetwork-ui/feature/editor'
import { map } from 'rxjs/operators'

@Component({
  selector: 'md-editor-my-records',
  templateUrl: './my-records.component.html',
  styleUrls: ['./my-records.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RecordsListComponent,
    ResultsTableContainerComponent,
    UiElementsModule,
    RecordsCountComponent,
    ButtonComponent,
    MatIconModule,
    ImportRecordComponent,
    FeatureSearchModule,
  ],
})
export class MyRecordsComponent implements OnInit, OnDestroy {
  private sub: Subscription
  ownerId: string

  @ViewChild('importRecordButton', { read: ElementRef })
  private importRecordButton!: ElementRef
  @ViewChild('template') template!: TemplateRef<any>
  private overlayRef!: OverlayRef

  searchText$: Observable<string | null> =
    this.searchFacade.searchFilters$.pipe(
      map((filters) => ('any' in filters ? (filters['any'] as string) : null))
    )

  isImportMenuOpen = false

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private searchFacade: SearchFacade,
    public searchService: SearchService,
    private platformService: PlatformServiceInterface,
    private fieldsService: FieldsService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchFacade.resetSearch()

    const searchTerms = this.activedRoute.snapshot.queryParams['q'] ?? ''

    if (searchTerms) {
      this.searchFacade.setFilters({ any: searchTerms })
    }

    let sort = (this.activedRoute.snapshot.queryParams['_sort'] as string) ?? ''

    if (sort) {
      let ascDesc = ''

      if (sort?.charAt(0) === '-') {
        ascDesc = 'desc'
        sort = sort.slice(1, sort.length)
      } else {
        ascDesc = 'asc'
      }
      this.searchFacade.setSortBy([ascDesc as 'asc' | 'desc', sort])
    }

    this.searchFacade.setPageSize(15)
    this.searchFacade.setConfigRequestFields(allSearchFields)

    this.sub = this.platformService.getMe().subscribe((user) => {
      this.ownerId = user.id
      this.fieldsService
        .buildFiltersFromFieldValues({ owner: user.id })
        .subscribe((filters) => {
          this.searchFacade.updateFilters(filters)
        })
    })
  }

  duplicateRecord(record: CatalogRecord) {
    this.router
      .navigate(['/duplicate', record.uniqueIdentifier])
      .catch((err) => console.error(err))
  }

  createRecord() {
    this.router.navigate(['/create']).catch((err) => console.error(err))
  }

  duplicateExternalRecord() {
    this.isImportMenuOpen = true

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.importRecordButton)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ])

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    })

    const portal = new TemplatePortal(this.template, this.viewContainerRef)

    this.overlayRef.attach(portal)

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeImportMenu()
    })
  }

  closeImportMenu() {
    if (this.overlayRef) {
      this.isImportMenuOpen = false
      this.overlayRef.dispose()
      this.cdr.markForCheck()
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
