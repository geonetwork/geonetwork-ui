import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { provideIcons } from '@ng-icons/core'
import { iconoirImport } from '@ng-icons/iconoir'

export default {
  title: 'Inputs/DragAndDropFileInputComponent',
  component: DragAndDropFileInputComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n(), provideIcons({ iconoirImport })],
    }),
  ],
} as Meta<DragAndDropFileInputComponent>

export const Primary: StoryObj<DragAndDropFileInputComponent> = {
  args: {
    placeholder: 'Drag and drop file',
    accept: '*',
  },
  argTypes: {
    fileChange: {
      action: 'fileChange',
    },
    errorChange: {
      action: 'errorChange',
    },
  },
}

export const WithIconAndColors: StoryObj<DragAndDropFileInputComponent> = {
  args: {
    placeholder: 'Import a GeoJSON',
    accept: '.json,.geojson',
    maxFileSizeMb: 2,
    icon: 'iconoirImport',
    dropzoneBackgroundColor: '#fff',
    textClass: 'text-black truncate',
    extraClass:
      'gn-ui-btn-outline w-full min-h-[32px] justify-between hover:border-[#D7D7DB] hover:bg-[#0000001A]',
  },
  argTypes: {
    fileChange: {
      action: 'fileChange',
    },
    errorChange: {
      action: 'errorChange',
    },
  },
}
