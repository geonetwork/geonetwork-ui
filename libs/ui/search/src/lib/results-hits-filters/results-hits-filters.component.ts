import { Component, EventEmitter, Input, Output } from '@angular/core'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  iconoirAppleWallet,
  iconoirAppleShortcuts,
  iconoirCode,
  iconoirCreditCard,
} from '@ng-icons/iconoir'
import { Choice } from './results-hits-filters.model'

@Component({
  selector: 'gn-ui-results-hits-filters',
  templateUrl: './results-hits-filters.component.html',
  viewProviders: [
    provideIcons({
      iconoirAppleWallet,
      iconoirAppleShortcuts,
      iconoirCode,
      iconoirCreditCard,
    }),
    provideNgIconsConfig({
      size: '1.3em',
    }),
  ],
})
export class ResultsHitsFiltersComponent {
  @Input() choices: Choice[]
  @Input() selected: unknown[] = []

  @Output() selectValues = new EventEmitter<unknown[]>()

  isSelected(choice: Choice) {
    return this.selected.indexOf(choice.value) > -1
  }

  select(choice: Choice, selected: boolean) {
    this.selected = selected
      ? [...this.selected.filter((v) => v !== choice.value), choice.value]
      : this.selected.filter((v) => v !== choice.value)
    this.selectValues.emit(this.selected)
  }
}
