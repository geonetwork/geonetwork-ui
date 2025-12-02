import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

export interface ModalDialogData {
  title: string
  body: TemplateRef<unknown>
  bodyContext: unknown
  confirmText: string
  cancelText: string
}

@Component({
  selector: 'gn-ui-modal-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDialogComponent {
  dialogRef = inject<MatDialogRef<ModalDialogComponent>>(MatDialogRef)
  data = inject<ModalDialogData>(MAT_DIALOG_DATA)

  onConfirm() {
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }
}
