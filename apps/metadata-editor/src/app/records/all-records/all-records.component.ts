import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {
  ResultsTableContainerComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RecordsCountComponent } from '../records-count/records-count.component'
import { Observable, of } from 'rxjs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { ImportRecordComponent } from '@geonetwork-ui/feature/editor'
import { RecordsListComponent } from '../records-list.component'
import { map } from 'rxjs/operators'

export const allSearchFields = [
  'uuid',
  'resourceTitleObject',
  'createDate',
  'changeDate',
  'userinfo',
  'cl_status',
  'isPublishedToAll',
  'link',
  'owner',
]

@Component({
  selector: 'md-editor-all-records',
  templateUrl: './all-records.component.html',
  styleUrls: ['./all-records.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RecordsCountComponent,
    ResultsTableContainerComponent,
    UiElementsModule,
    UiInputsModule,
    MatIconModule,
    ImportRecordComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    RecordsListComponent,
  ],
})
export class AllRecordsComponent implements OnInit {
  @ViewChild('importRecordButton', { read: ElementRef })
  importRecordButton!: ElementRef
  @ViewChild('template') template!: TemplateRef<any>
  private overlayRef!: OverlayRef

  searchText$: Observable<string | null> = of(null)

  isImportMenuOpen = false

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    public searchFacade: SearchFacade,
    public searchService: SearchService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchText$ = this.searchFacade.searchFilters$.pipe(
      map((filters) => ('any' in filters ? (filters['any'] as string) : null))
    )

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
}
