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
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

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
    ConfirmationDialogComponent,
    TranslateModule,
  ],
})
export class ActionMenuComponent {
  @Input() canDuplicate: boolean
  @Input() canDelete: boolean
  @Input() isDraftPage: boolean
  @Output() duplicate = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()
  @Output() closeActionMenu = new EventEmitter<void>()
  @Output() rollback = new EventEmitter<void>()

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  sectionDisplayed: ActionMenuPage = 'mainMenu'

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  openMenu() {
    this.trigger.openMenu()
  }

  displayMainMenu() {
    this.sectionDisplayed = 'mainMenu'
    this.cdr.markForCheck()
  }

  displayDeleteMenu() {
    if (this.isDraftPage) {
      this.sectionDisplayed = 'rollbackMenu'
    } else {
      this.sectionDisplayed = 'deleteMenu'
    }
    this.cdr.markForCheck()
  }
}
