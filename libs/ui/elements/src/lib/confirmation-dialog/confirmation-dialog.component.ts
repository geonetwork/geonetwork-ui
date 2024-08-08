import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

export interface ConfirmationDialogData {
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
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onConfirm() {
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }
}
