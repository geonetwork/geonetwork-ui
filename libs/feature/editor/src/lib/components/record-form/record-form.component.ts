import { CommonModule } from '@angular/common'
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldValue } from '../../models'
import { FormFieldComponent } from './form-field'
import { TranslateDirective } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import { filter, firstValueFrom, map, Subscription, switchMap } from 'rxjs'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent, TranslateDirective],
})
export class RecordFormComponent implements OnInit, OnDestroy {
  anchorIdPrefix = 'gn-ui--field-'
  facade = inject(EditorFacade)
  private injector = inject(Injector)
  private el = inject(ElementRef)
  subscription = new Subscription()

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
        .subscribe(({ field, pageIndex }) => {
          if (pageIndex !== null) {
            this.facade.setCurrentPage(pageIndex)
          }
          afterNextRender(() => this.scrollToQualityField(field), {
            injector: this.injector,
          })
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

  scrollToQualityField(field: string) {
    this.el.nativeElement.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    })
    document
      .getElementById(this.anchorIdPrefix + field)
      ?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }
}
