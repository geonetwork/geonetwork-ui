import { Component, Input } from '@angular/core'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular'
import { EditableLabelDirective } from './editable-label.directive'

@Component({
  selector: 'gn-ui-editable-label-story',
  template: `<h3
    class="text-3xl font-bold"
    [gnUiEditableLabel]="label"
    (editableLabelChanged)="handleEditableLabelChanged($event)"
  ></h3>`,
})
class EditableLabelStoryComponent {
  @Input() label: string

  handleEditableLabelChanged = action('editableLabelChanged')
}

export default {
  title: 'Inputs/EditableLabel',
  component: EditableLabelStoryComponent,
  decorators: [
    moduleMetadata({
      imports: [EditableLabelDirective],
    }),
  ],
} as Meta<EditableLabelStoryComponent>

export const Editable: StoryObj<EditableLabelStoryComponent> = {
  args: {
    label: 'This is an in place editable label.',
  },
  render: (args) => ({
    props: { ...args, editableLabelChanged: action('editableLabelChanged') },
  }),
}

export const EditableWithNewLinesAndSpaces: StoryObj<EditableLabelStoryComponent> =
  {
    args: {
      label: `   This is a multi-line
    editable label.  `,
    },
    render: (args) => ({
      props: { ...args, editableLabelChanged: action('editableLabelChanged') },
    }),
  }
