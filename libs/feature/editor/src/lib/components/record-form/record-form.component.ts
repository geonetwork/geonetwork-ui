import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldValue } from '../../models'
import { FieldFocusDirective, FormFieldComponent } from './form-field'
import { TranslateDirective } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  Subscription,
  switchMap,
} from 'rxjs'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'

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

  /** Model of the field currently requested to be focused, pushed down to the
   * matching `<gn-ui-form-field>` so it highlights and focuses itself. Reset to
   * null on the next macrotask once change detection has delivered it. */
  focusedFieldModel$ = new BehaviorSubject<CatalogRecordKeys | null>(null)

  recordUniqueIdentifier$ = this.facade.record$.pipe(
    map((record) => record.uniqueIdentifier)
  )

  ngOnInit() {
    this.subscription.add(
      this.facade.focusedField$
        .pipe(
          filter((field) => !!field),
          switchMap(async (field) => ({
            field: field as CatalogRecordKeys,
            pageIndex: await this.getPageIndexForField(
              field as CatalogRecordKeys
            ),
          }))
        )
        .subscribe(async ({ field, pageIndex }) => {
          // Push the focused field down so the matching form field reveals
          // (scrolls), highlights and focuses itself — the directive owns that
          // (works cross-page too: the field created after the page switch
          // reads this value via its binding during CD).
          this.focusedFieldModel$.next(field)
          // Only the page switch must stay here: a per-page directive cannot
          // bring its own off-page field on screen.
          const currentPage = await firstValueFrom(this.facade.currentPage$)
          if (pageIndex !== null && pageIndex !== currentPage) {
            this.facade.setCurrentPage(pageIndex)
          }
          // Clear the trigger on the next macrotask, once change detection has
          // delivered the focused field to the matching form field (even on a
          // freshly switched page) and it has revealed itself. The defer is
          // required: a synchronous or microtask reset would revert the value
          // before that change detection runs and the field would never glow.
          // Clearing it lets a re-click re-fire and avoids a spurious re-glow
          // when navigating back to the page.
          setTimeout(() => this.focusedFieldModel$.next(null))
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
