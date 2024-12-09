import { Meta, moduleMetadata, applicationConfig } from '@storybook/angular'
import { BadgeComponent } from './badge.component'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matDownloading,
  matPestControl,
  matWaves,
} from '@ng-icons/material-icons/baseline'

export default {
  title: 'Widgets/BadgeComponent',
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [NgIconComponent],
    }),
    applicationConfig({
      providers: [
        provideIcons({
          matDownloading,
          matPestControl,
          matWaves,
        }),
      ],
    }),
  ],
  argTypes: {
    badgeRemoveClicked: { action: 'badgeRemoveClicked' },
  },
} as Meta<BadgeComponent>

interface BadgeComponentContent extends Partial<BadgeComponent> {
  content: string
}

export const Primary = (args: BadgeComponentContent) => ({
  props: args,
  template: `<div class='flex flex-row gap-5 flex-wrap'>
    <gn-ui-badge [clickable]='clickable'
                 [removable]='removable' (badgeRemoveClicked)='badgeRemoveClicked($event)'>
      {{ content }}
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable'
                 [removable]='removable' (badgeRemoveClicked)='badgeRemoveClicked($event)'>
      with an icon&nbsp;<ng-icon name="matDownloading"></ng-icon>
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.font-size]='"1.3em"'
                 [removable]='removable' (badgeRemoveClicked)='badgeRemoveClicked($event)'>
      <ng-icon name="matPestControl"></ng-icon>&nbsp;larger (with css)
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.--gn-ui-badge-padding]='"0.75em 3em"'
                 [removable]='removable' (badgeRemoveClicked)='badgeRemoveClicked($event)'>
      different&nbsp;<ng-icon name="matWaves"></ng-icon>&nbsp;shape
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.--gn-ui-badge-rounded]='"10px"'
                 [removable]='removable' (badgeRemoveClicked)='badgeRemoveClicked($event)'>
      different corners
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.--gn-ui-badge-text-color]='"#004700"' [style.--gn-ui-badge-background-color]='"lightgreen"'
                 [removable]='removable' (badgeRemoveClicked)='badgeRemoveClicked($event)'>
      different colors
    </gn-ui-badge>
  </div>`,
})

Primary.args = {
  clickable: false,
  content: 'My custom badge',
  removable: false,
}
