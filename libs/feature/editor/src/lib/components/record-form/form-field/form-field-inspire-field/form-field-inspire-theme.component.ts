import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  AutocompleteComponent,
  BadgeComponent,
  DropdownMultiselectComponent,
} from '@geonetwork-ui/ui/inputs'
import { NgIconComponent } from '@ng-icons/core'
import { INSPIRE_THEMES } from '../../../../fields.config'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-inspire-theme',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    NgIconComponent,
    BadgeComponent,
    TranslatePipe,
    DropdownMultiselectComponent,
  ],
  templateUrl: './form-field-inspire-theme.component.html',
  styleUrl: './form-field-inspire-theme.component.css',
})
export class FormFieldInspireThemeComponent {
  themes = []
  @Input() set value(themes: string[]) {
    this.themes = themes
  }
  @Output() valueChange: EventEmitter<string[]> = new EventEmitter()
  availableThemes = INSPIRE_THEMES.map((theme) => {
    return {
      label: this.translateService.instant(theme.label),
      value: theme.value,
    }
  })

  constructor(private translateService: TranslateService) {}

  handleItemSelection(selectedItems: string[]) {
    this.themes = selectedItems
    this.valueChange.emit(this.themes)
  }

  removeTheme(theme: string) {
    this.themes = this.themes.filter((t) => t !== theme)
    this.valueChange.emit(this.themes)
  }

  getTranslatedTheme(theme: string) {
    const themeKey = this.availableThemes.find(
      (avail) => avail.value === theme
    )?.label
    return themeKey ? this.translateService.instant(themeKey) : ''
  }
}
