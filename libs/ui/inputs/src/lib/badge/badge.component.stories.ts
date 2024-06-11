import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { BadgeComponent } from './badge.component'
import { MatIconModule } from '@angular/material/icon'

export default {
  title: 'Widgets/BadgeComponent',
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
} as Meta<BadgeComponent>

interface BadgeComponentContent extends Partial<BadgeComponent> {
  content: string
}

export const Primary = (
  args: BadgeComponentContent & { removable: boolean }
) => ({
  props: args,
  template: `<div class='flex flex-row gap-5 flex-wrap'>
    <gn-ui-badge [clickable]='clickable' [removable]='removable'>
      {{ content }}
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [removable]='removable'>
      with an icon&nbsp;<mat-icon class="material-symbols-outlined">downloading</mat-icon>
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.font-size]='"1.3em"' [removable]='removable'>
      <mat-icon class='material-symbols-outlined'>pest_control</mat-icon>&nbsp;larger (with css)
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.--gn-ui-badge-padding]='"0.75em 3em"' [removable]='removable'>
      different&nbsp;<mat-icon class="material-symbols-outlined">waves</mat-icon>&nbsp;shape
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.--gn-ui-badge-rounded]='"10px"' [removable]='removable'>
      different corners
    </gn-ui-badge>
    <gn-ui-badge [clickable]='clickable' [style.--gn-ui-badge-text-color]='"#004700"' [style.--gn-ui-badge-background-color]='"lightgreen"' [removable]='removable'>
      different colors
    </gn-ui-badge>
  </div>`,
})

Primary.args = {
  clickable: false,
  content: 'My custom badge',
  removable: false,
}
