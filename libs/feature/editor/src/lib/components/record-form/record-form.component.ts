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
import { FormFieldComponent } from './form-field'
import { TranslateDirective } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import {
  firstValueFrom,
  map,
  Observable,
  of,
  Subscription,
  take,
  withLatestFrom,
} from 'rxjs'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'
import { switchMap } from 'rxjs/operators'
import { evaluate, isExpression } from '../../expressions'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent, TranslateDirective],
})
export class RecordFormComponent implements OnInit, OnDestroy {
  facade = inject(EditorFacade)
  notifications = inject(NotificationsService)
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

  focusField(model: CatalogRecordKeys) {
    const fields = this.formFields()
    const field = fields.find((f) => f.model === model)
    field?.fieldFocus.focusField()
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

  evaluateExpression(
    expression: string | EditorFieldValue
  ): Observable<EditorFieldValue> {
    if (!isExpression(expression)) {
      return of(expression)
    }
    const { evaluator, errors } = evaluate(expression as string)
    if (errors.length) {
      console.error(`The following errors happened while evaluating the expression '${expression}':
${errors.map((err) => `> ${err}`).join('\n')}`)
      this.notifications.showNotification({
        type: 'warning',
        title: 'Technical error',
        text: 'An error happened while evaluating an expression inside the editor configuration; open the developer console for more information',
      })
    }
    return this.facade.record$.pipe(
      take(1),
      map((record) =>
        evaluator({
          globals: {
            record,
          },
        })
      )
    )
  }
}
