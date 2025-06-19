import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  FieldSort,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import {
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
} from '@geonetwork-ui/ui/inputs'
import {
  InteractiveTableColumnComponent,
  InteractiveTableComponent,
} from '@geonetwork-ui/ui/layout'
import {
  DateService,
  FileFormat,
  formatUserInfo,
  getBadgeColor,
  getFileFormat,
  getFormatPriority,
} from '@geonetwork-ui/util/shared'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { ActionMenuComponent } from './action-menu/action-menu.component'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirLock, iconoirTranslate, iconoirUser } from '@ng-icons/iconoir'
import { CdkOverlayOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { matMoreVert } from '@ng-icons/material-icons/baseline'
import { Observable, of, take } from 'rxjs'

@Component({
  selector: 'gn-ui-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    InteractiveTableComponent,
    InteractiveTableColumnComponent,
    TranslateDirective,
    TranslatePipe,
    BadgeComponent,
    ActionMenuComponent,
    NgIconComponent,
    CdkOverlayOrigin,
    CheckboxComponent,
    ButtonComponent,
  ],
  providers: [
    provideIcons({ iconoirUser, iconoirLock, iconoirTranslate, matMoreVert }),
  ],
})
export class ResultsTableComponent {
  @Input() records: CatalogRecord[] = []
  @Input() selectedRecordsIdentifiers: string[] = []
  @Input() sortOrder: SortByField = null
  @Input() hasDraft: (record: CatalogRecord) => boolean = () => false
  @Input() canDuplicate: (record: CatalogRecord) => boolean = () => true
  @Input() canDelete: (record: CatalogRecord) => Observable<boolean> = () =>
    of(true)
  @Input() canEdit: (record: CatalogRecord) => Observable<boolean> = () =>
    of(true)
  @Input() isDraftPage = false
  @Input() isDuplicating = false

  // emits the column (field) as well as the order
  @Output() sortByChange = new EventEmitter<[string, 'asc' | 'desc']>()
  @Output() recordClick = new EventEmitter<CatalogRecord>()
  @Output() duplicateRecord = new EventEmitter<CatalogRecord>()
  @Output() deleteRecord = new EventEmitter<CatalogRecord>()
  @Output() rollbackDraft = new EventEmitter<CatalogRecord>()
  @Output() recordsSelectedChange = new EventEmitter<
    [CatalogRecord[], boolean]
  >()

  @ViewChildren('actionMenuButton', { read: ElementRef })
  actionMenuButtons!: QueryList<ElementRef>
  private overlayRef!: OverlayRef

  isActionMenuOpen = false

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private dateService: DateService,
    private translateService: TranslateService
  ) {}

  openActionMenu(item, template) {
    this.isActionMenuOpen = true
    const index = this.records.indexOf(item)
    const buttonElement = this.actionMenuButtons.toArray()[index]

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(buttonElement)
      .withFlexibleDimensions(true)
      .withPush(true)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ])

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    })

    const portal = new TemplatePortal(template, this.viewContainerRef)

    this.overlayRef.attach(portal)

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeActionMenu()
    })
  }

  closeActionMenu() {
    if (this.overlayRef) {
      this.isActionMenuOpen = false
      this.overlayRef.dispose()
      this.cdr.markForCheck()
    }
  }

  dateToString(date: Date): string {
    return this.dateService.formatDate(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  getRecordFormats(record: CatalogRecord): FileFormat[] {
    if (record.kind === 'service' || !('onlineResources' in record)) {
      return []
    }
    const formats = Array.from(
      new Set(
        record.onlineResources.map((onlineResource) =>
          getFileFormat(onlineResource)
        )
      )
    ).filter((format) => !!format)
    formats.sort((a, b) => getFormatPriority(b) - getFormatPriority(a))
    return formats
  }

  formatUserInfo(userInfo: string | unknown): string {
    return formatUserInfo(userInfo)
  }

  getBadgeColor(format: FileFormat): string {
    return getBadgeColor(format)
  }

  handleRecordClick(item: unknown) {
    this.canEdit(item as CatalogRecord)
      .pipe(take(1))
      .subscribe((canEdit) => {
        if (canEdit) {
          this.recordClick.emit(item as CatalogRecord)
        }
      })
  }

  handleDuplicate(item: unknown) {
    this.duplicateRecord.emit(item as CatalogRecord)
  }

  handleDelete(item: unknown) {
    this.deleteRecord.emit(item as CatalogRecord)
    this.closeActionMenu()
  }

  handleRollback(item: unknown) {
    this.rollbackDraft.emit(item as CatalogRecord)
    this.closeActionMenu()
  }

  setSortBy(col: string, order: 'asc' | 'desc') {
    this.sortByChange.emit([col, order])
  }

  isSortedBy(col: string): 'desc' | 'asc' | null {
    if (!this.sortOrder) {
      return null
    }
    const sortArray = Array.isArray(this.sortOrder[0])
      ? (this.sortOrder as FieldSort[])
      : ([this.sortOrder] as FieldSort[])
    for (const sort of sortArray) {
      if (sort[1] === col) {
        return sort[0]
      }
    }
    return null
  }

  isChecked(record: CatalogRecord): boolean {
    return this.selectedRecordsIdentifiers.includes(record.uniqueIdentifier)
  }

  handleRecordSelectedChange(selected: boolean, record: CatalogRecord) {
    this.recordsSelectedChange.emit([[record], selected])
  }

  isMultilingual(record: CatalogRecord): boolean {
    return record.otherLanguages.length > 0
  }

  getTxtHoverMultilingual(record: CatalogRecord) {
    const languages = [
      ...[record.defaultLanguage],
      ...record.otherLanguages,
    ].sort((a, b) => a.localeCompare(b))

    return this.translateService.instant('dashboard.records.isMultilingual', {
      languages: languages.join(', '),
    })
  }
}
