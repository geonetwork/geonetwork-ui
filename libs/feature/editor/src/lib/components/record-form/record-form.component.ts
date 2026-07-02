import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  viewChildren,
} from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldValue } from '../../models'
import { FieldFocusDirective, FormFieldComponent } from './form-field'
import { TranslateDirective } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import { firstValueFrom, map, Subscription, withLatestFrom } from 'rxjs'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    FieldFocusDirective,
    TranslateDirective,
  ],
})
export class RecordFormComponent implements OnInit, OnDestroy {
  facade = inject(EditorFacade)
  subscription = new Subscription()

  recordUniqueIdentifier$ = this.facade.record$.pipe(
    map((record) => record.uniqueIdentifier)
  )

  focusFieldWithPage$ = this.facade.focusedField$.pipe(
    switchMap(
      async (field) => [field, await this.getPageIndexForField(field)] as const
    )
  )

  formFields = viewChildren(FormFieldComponent)
  sectionFocusDirectives = viewChildren<FieldFocusDirective>('sectionFocus')

  async focusField(model: CatalogRecordKeys) {
    const field = this.formFields().find((f) => f.model === model)
    if (field) {
      field.fieldFocus.focusField()
      return
    }
    // field not rendered (e.g. hidden by constraints toggles): glow its section
    const sections = await firstValueFrom(this.facade.currentSections$)
    const sectionIndex = sections
      .filter((section) => !section.hidden)
      .findIndex((section) =>
        section.fieldsWithValues.some((f) => f.config.model === model)
      )
    this.sectionFocusDirectives()[sectionIndex]?.focusField()
  }

  ngOnInit() {
    this.subscription.add(
      this.focusFieldWithPage$
        .pipe(
          withLatestFrom(
            this.facade.currentPage$,
            ([field, fieldPage], currentPage) =>
              [field, fieldPage, currentPage] as const
          )
        )
        .subscribe(([field, fieldPage, currentPage]) => {
          if (fieldPage !== null && fieldPage !== currentPage) {
            this.facade.setCurrentPage(fieldPage)
          }
          setTimeout(() => this.focusField(field))
        })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  handleFieldValueChange(model: CatalogRecordKeys, newValue: EditorFieldValue) {
    if (!model) {
      return
    }
    this.facade.updateRecordField(model, newValue)
  }

  fieldTracker(index: number, field: EditorFieldWithValue) {
    return field.config.model
  }

  sectionTracker(index: number, section: EditorSectionWithValues) {
    return section.labelKey
  }

  async getPageIndexForField(model: CatalogRecordKeys): Promise<number | null> {
    const config = await firstValueFrom(this.facade.editorConfig$)
    const pageIndex = config.pages.findIndex((page) =>
      page.sections.some((section) =>
        section.fields.some((field) => field.model === model)
      )
    )
    return pageIndex >= 0 ? pageIndex : null
  }
}
