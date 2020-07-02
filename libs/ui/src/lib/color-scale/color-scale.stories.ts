import { moduleMetadata, storiesOf } from '@storybook/angular'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { UiModule } from '../../../../ui/src'
import { ColorScaleComponent } from './color-scale.component'
import { ColorService } from '../../../../common/src/lib/color.service'

const moduleMetadatas = {
  imports: [UiModule],
}

storiesOf('Presentation components', module)
  .addDecorator(moduleMetadata(moduleMetadatas))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('ColorScaleComponent', () => ({
    component: ColorScaleComponent,
  }))

ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
