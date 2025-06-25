import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

type ActionMenuPage = 'mainMenu' | 'deleteMenu' | 'rollbackMenu'

@Component({
  selector: 'gn-ui-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatMenuModule,
    MatDialogModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class ActionMenuComponent {
  @Input() canDuplicate = true
  @Input() isDuplicating: boolean
  @Input() canDelete = true
  @Input() page: 'draft' | 'main' | 'record'
  @Output() duplicate = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()
  @Output() closeActionMenu = new EventEmitter<void>()
  @Output() rollback = new EventEmitter<void>()
  @Output() switch = new EventEmitter<void>()

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  sectionDisplayed: ActionMenuPage = 'mainMenu'

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  displayMainMenu() {
    this.sectionDisplayed = 'mainMenu'
    this.cdr.markForCheck()
  }

  displayDeleteMenu() {
    switch (this.page) {
      case 'draft':
        this.sectionDisplayed = 'rollbackMenu'
        break
      case 'record':
        this.delete.emit()
        break
      case 'main':
      default:
        this.sectionDisplayed = 'deleteMenu'
    }
    this.cdr.markForCheck()
  }
}
