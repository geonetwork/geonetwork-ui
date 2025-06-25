import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core'
import { Choice } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-results-hits-search-kind',
  templateUrl: './results-hits-search-kind.component.html',
})
export class ResultsHitsSearchKindComponent implements OnChanges {
  @Input() selected: string[] = []
  @Input() choices: Choice[] = []
  @Output() selectionChanged = new EventEmitter<string[]>()

  availableChoices: Choice[] = []

  ngOnChanges(changes: SimpleChanges) {
    if (changes.choices && changes.choices.currentValue) {
      this.availableChoices = this.buildFilterChoices(this.choices)
    }
  }

  buildFilterChoices(availableValues: Choice[]) {
    return [
      ...[
        {
          label: 'all',
          value: 'all',
        },
      ],
      ...availableValues,
    ]
  }

  onSelectedValues(values: string[]) {
    const selectedValues = values.includes('all') ? [] : values

    this.selectionChanged.emit(selectedValues)
  }

  isSelectedChoice(choiceValue: string) {
    return this.selected.includes(choiceValue)
  }

  isAllChoice(choiceValue: string) {
    return this.selected.length === 0 && choiceValue === 'all'
  }
}
