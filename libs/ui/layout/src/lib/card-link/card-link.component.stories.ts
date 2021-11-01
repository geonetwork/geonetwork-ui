import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import { CardLinkComponent } from './card-link.component'

export default {
  title: 'Layout/CardLinkComponent',
  component: CardLinkComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 300px">${story}</div>`
    ),
  ],
} as Meta<CardLinkComponent>

type CardLinkComponentWithContent = CardLinkComponent & { content: string }

const Template: Story<CardLinkComponentWithContent> = (args) => ({
  component: CardLinkComponent,
  props: args,
  template:
    '<gn-ui-card-link [linkHref]="linkHref" [newTab]="newTab">{{content}}</gn-ui-card-link>',
})

export const Primary = Template.bind({})
Primary.args = {
  linkHref: 'http://archimer.ifremer.fr/doc/00409/52016/',
  newTab: false,
  content:
    'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public.',
}
