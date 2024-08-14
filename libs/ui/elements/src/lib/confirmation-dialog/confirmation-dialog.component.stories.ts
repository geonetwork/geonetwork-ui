import { Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

@Component({
  selector: 'gn-ui-launcher',
  template: `
    <gn-ui-button (buttonClick)="launch()">Open</gn-ui-button>
    <span *ngIf="confirmed === undefined">Waiting for a result</span>
    <span *ngIf="confirmed">Confirmed</span>
    <span *ngIf="confirmed === false">Canceled</span>
  `,
})
class LaunchDialogComponent {
  @Input() title = ''
  @Input() message = ''
  @Input() confirmText = ''
  @Input() cancelText = ''

  confirmed: boolean

  constructor(private _dialog: MatDialog) {}

  launch(): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.title,
        message: this.message,
        confirmText: this.confirmText,
        cancelText: this.cancelText,
      },
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      this.confirmed = confirmed
    })
  }
}

export default {
  title: 'Elements/ConfirmationDialogComponent',
  component: LaunchDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, ConfirmationDialogComponent],
    }),
  ],
} as Meta

export const Primary: StoryObj<LaunchDialogComponent> = {
  args: {
    title: 'Some title',
    message: 'Some message to confirm',
    confirmText: 'OK',
    cancelText: 'KO',
  },
}
