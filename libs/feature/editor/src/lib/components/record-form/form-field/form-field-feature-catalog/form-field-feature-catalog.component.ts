import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DatasetFeatureType } from '@geonetwork-ui/common/domain/model/record'
import {
  ButtonComponent,
  TextAreaComponent,
  TextInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { ConfirmationDialogComponent } from '@geonetwork-ui/ui/elements'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirNewTab, iconoirBin } from '@ng-icons/iconoir'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-feature-catalog',
  templateUrl: './form-field-feature-catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ButtonComponent,
    TextInputComponent,
    TextAreaComponent,
    FormFieldWrapperComponent,
    NgIconComponent,
    TranslatePipe,
  ],
  providers: [provideIcons({ iconoirNewTab, iconoirBin })],
})
export class FormFieldFeatureCatalogComponent {
  private dialog = inject(MatDialog)
  private translateService = inject(TranslateService)

  @Input() value: DatasetFeatureType[] = []
  @Output() valueChange = new EventEmitter<DatasetFeatureType[]>()

  get featureType(): DatasetFeatureType | undefined {
    return this.value?.[0]
  }

  createFeatureType() {
    this.valueChange.emit([{ name: '', description: '', attributes: [] }])
  }

  updateFeatureType(change: Partial<DatasetFeatureType>) {
    const [first, ...rest] = this.value
    this.valueChange.emit([{ ...first, ...change }, ...rest])
  }

  confirmDeleteFeatureCatalog() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: this.translateService.instant(
            'editor.record.form.featureCatalog.deleteConfirmation.title'
          ),
          message: this.translateService.instant(
            'editor.record.form.featureCatalog.deleteConfirmation.message'
          ),
          confirmText: this.translateService.instant(
            'editor.record.form.featureCatalog.deleteConfirmation.confirmText'
          ),
          cancelText: this.translateService.instant(
            'editor.record.form.featureCatalog.deleteConfirmation.cancelText'
          ),
          focusCancel: true,
        },
        restoreFocus: true,
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) this.valueChange.emit([])
      })
  }
}
