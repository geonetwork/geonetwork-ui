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
    switchMap(async (field) => {
      const { page, section } = await this.getFieldLocation(field)
      return [field, page, section] as const
    })
  )

  formFields = viewChildren(FormFieldComponent)
  sectionFocusDirectives = viewChildren<FieldFocusDirective>('sectionFocus')

  focusField(model: CatalogRecordKeys, section: number | null) {
    const field = this.formFields().find((f) => f.model === model)
    if (field) {
      field.fieldFocus.focusField()
      return
    }
    this.sectionFocusDirectives()[section]?.focusField(false)
  }

  ngOnInit() {
    this.subscription.add(
      this.focusFieldWithPage$
        .pipe(
          withLatestFrom(
            this.facade.currentPage$,
            ([field, fieldPage, fieldSection], currentPage) =>
              [field, fieldPage, fieldSection, currentPage] as const
          )
        )
        .subscribe(([field, fieldPage, fieldSection, currentPage]) => {
          if (fieldPage !== null && fieldPage !== currentPage) {
            this.facade.setCurrentPage(fieldPage)
          }
          setTimeout(() => this.focusField(field, fieldSection))
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

  async getFieldLocation(
    model: CatalogRecordKeys
  ): Promise<{ page: number | null; section: number | null }> {
    const config = await firstValueFrom(this.facade.editorConfig$)
    const page = config.pages.findIndex((p) =>
      p.sections.some((s) => s.fields.some((f) => f.model === model))
    )
    if (page < 0) {
      return { page: null, section: null }
    }
    const section = config.pages[page].sections
      .filter((s) => !s.hidden)
      .findIndex((s) => s.fields.some((f) => f.model === model))
    return { page, section: section >= 0 ? section : null }
  }
}
