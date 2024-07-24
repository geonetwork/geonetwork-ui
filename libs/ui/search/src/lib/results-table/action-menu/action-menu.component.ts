import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css'],
  standalone: true,
  imports: [MatIconModule, ButtonComponent, MatMenuModule, TranslateModule],
})
export class ActionMenuComponent {
  @Output() duplicate = new EventEmitter<void>()

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  openMenu() {
    this.trigger.openMenu()
  }
}
