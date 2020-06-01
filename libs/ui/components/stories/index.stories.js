import { Button } from '@storybook/angular/demo';
import {ComponentsComponent} from '../src'
import {MdListComponent} from '../src/lib/md-list/md-list.component'

export default { title: 'My Button' }

export const withText = () => ({
  component: Button,
  props: {
    text: 'Hello Button',
  },
});

export const withEmoji = () => ({
  component: Button,
  props: {
    text: '😀 😎 👍 💯',
  },
});

export const geonetwork = () => ({
  component: ComponentsComponent
});
export const webComponent = () => ({
  component: MdListComponent,
  props: {
    title: 'INPUT'
  }
});
