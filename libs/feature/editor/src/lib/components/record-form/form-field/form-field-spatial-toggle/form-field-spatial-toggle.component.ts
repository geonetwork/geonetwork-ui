import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  SwitchToggleComponent,
  SwitchToggleOption,
} from '@geonetwork-ui/ui/inputs'
import { EditorFacade } from '../../../../+state/editor.facade'
import { firstValueFrom, map, Observable } from 'rxjs'
import { SPATIAL_SCOPES } from '../../../../fields.config'

@Component({
  selector: 'gn-ui-form-field-spatial-toggle',
  standalone: true,
  imports: [CommonModule, SwitchToggleComponent],
  templateUrl: './form-field-spatial-toggle.component.html',
  styleUrls: ['./form-field-spatial-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldSpatialToggleComponent {
  allKeywords$ = this.editorFacade.record$.pipe(
    map((record) => record?.keywords)
  )

  switchToggleOptions$: Observable<SwitchToggleOption[]> =
    this.allKeywords$.pipe(
      map((keywords) =>
        SPATIAL_SCOPES.map((scope) => {
          const isChecked = keywords.some(
            (keyword) => keyword.label === scope.label
          )
          return {
            label: scope.label,
            checked: isChecked,
          }
        })
      )
    )

  constructor(private editorFacade: EditorFacade) {}

  async onSpatialScopeChange(selectedOption: SwitchToggleOption) {
    // remove all existing spatial scope keywords
    const allKeywords = await firstValueFrom(this.allKeywords$)
    const filteredKeywords = allKeywords.filter((keyword) => {
      const spatialScopeLabels = SPATIAL_SCOPES.map((scope) => scope.label)
      return !spatialScopeLabels.includes(keyword.label)
    })

    const selectedOptionLabel = selectedOption.label
    const selectedKeyword = SPATIAL_SCOPES.find(
      (scopes) => scopes.label === selectedOptionLabel
    )

    // add the selected spatial scope keyword
    this.editorFacade.updateRecordField('keywords', [
      ...filteredKeywords,
      { ...selectedKeyword },
    ])
  }
}
