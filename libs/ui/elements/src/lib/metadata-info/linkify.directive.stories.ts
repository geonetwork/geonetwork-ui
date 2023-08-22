import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { GnUiLinkifyDirective } from './linkify.directive'

export default {
  title: 'Elements/GnUiLinkifyDirective',
  decorators: [
    moduleMetadata({
      declarations: [GnUiLinkifyDirective],
    }),
  ],
} as Meta<GnUiLinkifyDirective>

export const Primary: StoryObj<any> = {
  args: {
    htmlContent: `Région Hauts-de-France, Dreal, IGN BD Topo<br>

    Les données produites s'appuient sur le modèle CNIG de juin 2018 relatif aux SCoT : http://cnig.gouv.fr/wp-content/uploads/2019/04/190315_Standard_CNIG_SCOT.pdf<br>
    
    La structure a été modifiée au 03/2023 pour prendre en compte les évolutions du modèle CNIG du 10/06/2021 :<br>
    http://cnig.gouv.fr/IMG/pdf/210615_standard_cnig_nouveauscot.pdf<br>
    (il coexiste donc dans le modèle des champs liés aux deux modèles, par exemple sur les PADD pour les "anciens" SCoT, ou encore sur les PAS ou les DAAC pour les "nouveaux" SCoT)`,
  },
  argTypes: {
    htmlContent: {
      control: 'text',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div
        gnUiLinkify>
      ${args.htmlContent}
    </div>`,
  }),
}
