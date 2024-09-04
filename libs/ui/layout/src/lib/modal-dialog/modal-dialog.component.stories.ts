import { Component, Input, TemplateRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ModalDialogComponent } from './modal-dialog.component'

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
  @Input() body: TemplateRef<unknown>
  @Input() confirmText = ''
  @Input() cancelText = ''

  confirmed: boolean

  constructor(private _dialog: MatDialog) {}

  launch(): void {
    const dialogRef = this._dialog.open(ModalDialogComponent, {
      data: {
        title: this.title,
        body: this.body,
        bodyContext: { name: 'John Doe' },
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
  title: 'Layout/ModalDialogComponent',
  component: LaunchDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, ModalDialogComponent],
    }),
  ],
} as Meta

export const Primary: StoryObj<unknown> = {
  args: {
    title: 'Some title',
    bodyText: 'welcome to this website!',
    confirmText: 'OK',
    cancelText: 'KO',
  },
  render: (args) => ({
    props: args,
    template: `
<gn-ui-launcher [title]="title" [body]="body" [confirmText]="confirmText" [cancelText]="cancelText"></gn-ui-launcher>
<ng-template #body let-context>
  The body of the dialog is: {{ bodyText }}<br>
  The name in the context is: {{ context.name }}
</ng-template>
`,
  }),
}
