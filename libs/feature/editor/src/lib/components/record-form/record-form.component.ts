import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
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
import { toSignal } from '@angular/core/rxjs-interop'
import { evaluate, isExpression } from '../../expressions'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'

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
  notifications = inject(NotificationsService)
  subscription = new Subscription()

  recordUniqueIdentifier$ = this.facade.record$.pipe(
    map((record) => record.uniqueIdentifier)
  )

  focusFieldWithPage$ = this.facade.focusedField$.pipe(
    switchMap(async (field) => {
      const location = await this.getFieldLocation(field)
      return [field, location?.page ?? null, location?.section ?? -1] as const
    })
  )

  formFields = viewChildren(FormFieldComponent)
  sectionFocusDirectives = viewChildren<FieldFocusDirective>('sectionFocus')

  focusField(model: CatalogRecordKeys, sectionIndex: number) {
    const field = this.formFields().find((f) => f.model === model)
    if (field) {
      field.fieldFocus.focusField()
      return
    }
    this.sectionFocusDirectives()[sectionIndex]?.focusField(false)
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
  ): Promise<{ page: number; section: number } | null> {
    const config = await firstValueFrom(this.facade.editorConfig$)
    const page = config.pages.findIndex((p) =>
      p.sections.some((s) => s.fields.some((f) => f.model === model))
    )
    if (page < 0) {
      return null
    }
    const section = config.pages[page].sections
      .filter((s) => !s.hidden)
      .findIndex((s) => s.fields.some((f) => f.model === model))
    return { page, section }
  }

  private recordSignal = toSignal(this.facade.record$, { requireSync: true })
  private expressionCache = new Map<string, Signal<EditorFieldValue>>()

  // only compiles the expression into an evaluator the first time;
  // then we store a computed() signal in the cache so that the evaluator is
  // run again if the record changes
  evaluateExpression(
    expressionOrValue: string | EditorFieldValue
  ): Signal<EditorFieldValue> {
    if (!isExpression(expressionOrValue)) {
      return signal(expressionOrValue as EditorFieldValue)
    }
    const expression = expressionOrValue as string
    if (this.expressionCache.has(expression)) {
      return this.expressionCache.get(expression)
    }
    const { evaluator, errors } = evaluate(expression)
    if (errors.length) {
      console.error(`The following errors happened while evaluating the expression '${expression}':
${errors.map((err) => `> ${err}`).join('\n')}`)
      this.notifications.showNotification({
        type: 'warning',
        title: 'Technical error',
        text: 'An error happened while evaluating an expression inside the editor configuration; open the developer console for more information',
      })
    }
    this.expressionCache.set(
      expression,
      computed(() => evaluator({ globals: { record: this.recordSignal() } }))
    )
    return this.expressionCache.get(expression)
  }
}
