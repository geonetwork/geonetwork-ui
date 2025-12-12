import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

export interface ConfirmationDialogData {
  focusCancel: string
  title: string
  message: string
  confirmText: string
  cancelText: string
}

@Component({
  selector: 'gn-ui-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
})
export class ConfirmationDialogComponent {
  dialogRef = inject<MatDialogRef<ConfirmationDialogComponent>>(MatDialogRef)
  data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA)

  focusCancel = null
  constructor() {
    const data = this.data

    this.focusCancel = data.focusCancel ? true : null
  }

  onConfirm() {
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }
}
