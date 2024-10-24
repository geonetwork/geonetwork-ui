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
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matMoreVert } from '@ng-icons/material-icons/baseline'

type ActionMenuPage = 'mainMenu' | 'deleteMenu'

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
    NgIconComponent,
  ],
  providers: [provideIcons({ matMoreVert })],
})
export class ActionMenuComponent {
  @Input() canDuplicate: boolean
  @Input() canDelete: boolean
  @Output() duplicate = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()
  @Output() closeActionMenu = new EventEmitter<void>()

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  sectionDisplayed: ActionMenuPage = 'mainMenu'

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  openMenu() {
    this.trigger.openMenu()
  }

  displayMainMenu() {
    this.sectionDisplayed = 'mainMenu'
    this.cdr.markForCheck()
  }

  displayDeleteMenu() {
    this.sectionDisplayed = 'deleteMenu'
    this.cdr.markForCheck()
  }
}
