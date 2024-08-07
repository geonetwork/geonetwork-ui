import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldValue } from '../../models'
import { FormFieldComponent } from './form-field'
import { TranslateModule } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent, TranslateModule, UiInputsModule],
})
export class RecordFormComponent {
  isHidden: boolean

  get config() {
    console.log(getGlobalConfig().LICENSES)
    return getGlobalConfig().LICENSES
  }
  constructor(public facade: EditorFacade) {}

  onOpenDataToggled(args) {
    if (args.length) {
      this.isHidden = args[0]
      if (args[1].length) {
        this.facade.updateRecordField('licenses', args[1])
      }
    } else {
      this.isHidden = args
    }
  }

  handleFieldValueChange(model: any, newValue: EditorFieldValue) {
    if (!model) {
      return
    }
    this.facade.updateRecordField(model, newValue)
  }

  fieldTracker(index: number, field: EditorFieldWithValue): any {
    return field.config.model
  }

  sectionTracker(index: number, section: EditorSectionWithValues): any {
    return section.labelKey
  }
  handleVisibility(event) {
    this.isHidden = event
  }
}
