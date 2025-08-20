import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AutocompleteComponent, BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent } from '@ng-icons/core'
import { INSPIRE_THEMES } from '../../../../fields.config'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { of } from 'rxjs'

type AutocompleteItem = { title: string; value: string }

@Component({
  selector: 'gn-ui-form-field-inspire-theme',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    NgIconComponent,
    BadgeComponent,
    TranslatePipe,
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
  availableThemes = INSPIRE_THEMES

  displayWithFn = (item: AutocompleteItem) => {
    return item?.title ? `${item.title}` : ''
  }

  autoCompleteAction = (query: string) => {
    return of(
      this.availableThemes
        .filter((theme) =>
          theme.value.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {
          const aStarts = a.value.startsWith(query)
          const bStarts = b.value.startsWith(query)

          if (aStarts && !bStarts) return -1
          if (!aStarts && bStarts) return 1
          return 0
        })
        .map((theme) => {
          return {
            title: this.translateService.instant(theme.label),
            value: theme.value,
          }
        })
    )
  }

  constructor(private translateService: TranslateService) {}

  handleItemSelection(item: AutocompleteItem) {
    this.addTheme(item.value)
  }

  addTheme(theme: string) {
    const duplicatedTheme = this.themes.find((t) => t === theme)
    if (!duplicatedTheme) {
      this.themes = [...this.themes, theme]
      this.valueChange.emit(this.themes)
    }
  }

  removeTheme(theme: string) {
    console.log(this.themes)
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
