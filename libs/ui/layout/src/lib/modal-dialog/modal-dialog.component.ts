import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  TemplateRef,
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
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogData
  ) {}

  onConfirm() {
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }
}
