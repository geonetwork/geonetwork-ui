import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import {
  FeatureSearchModule,
  FieldsService,
  FILTER_SUMMARY_IGNORE_LIST,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Router } from '@angular/router'
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { RecordsCountComponent } from '../records-count/records-count.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { ImportRecordComponent } from '@geonetwork-ui/feature/editor'
import { SearchFiltersComponent } from '../../dashboard/search-filters/search-filters.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  iconoirNavArrowDown,
  iconoirNavArrowUp,
  iconoirPagePlus,
} from '@ng-icons/iconoir'

const FILTER_OWNER = 'owner'

@Component({
  selector: 'md-editor-my-records',
  templateUrl: './my-records.component.html',
  styleUrls: ['./my-records.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    RecordsListComponent,
    RecordsCountComponent,
    ButtonComponent,
    ImportRecordComponent,
    FeatureSearchModule,
    SearchFiltersComponent,
    NgIconComponent,
    OverlayModule,
  ],
  providers: [
    provideIcons({
      iconoirNavArrowDown,
      iconoirNavArrowUp,
      iconoirPagePlus,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
    { provide: FILTER_SUMMARY_IGNORE_LIST, useValue: [FILTER_OWNER] },
  ],
})
export class MyRecordsComponent implements OnInit {
  @ViewChild('importRecordButton', { read: ElementRef })
  private importRecordButton!: ElementRef
  @ViewChild('template') template!: TemplateRef<any>
  private overlayRef!: OverlayRef
  searchFields = ['changeDate']

  isImportMenuOpen = false

  constructor(
    private router: Router,
    protected searchFacade: SearchFacade,
    private platformService: PlatformServiceInterface,
    private fieldsService: FieldsService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchFacade.resetSearch()

    this.platformService.getMe().subscribe((user) => {
      this.fieldsService
        .buildFiltersFromFieldValues({ [FILTER_OWNER]: user.id })
        .subscribe((filters) => {
          this.searchFacade.updateFilters(filters)
        })
    })
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
