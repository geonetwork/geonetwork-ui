import { withA11y } from '@storybook/addon-a11y'
import { object, select, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { I18nModule } from '../../../../common/src'
import { RecordSimple } from '../../../../search/src'
import { UiModule } from '../ui.module'
import {
  ResultsListComponent,
  ResultsListLayout,
} from './results-list.component'

const moduleMetadatas = {
  declaration: [],
  imports: [I18nModule, UiModule],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
}

const records: RecordSimple[] = [
  {
    title: 'metadata 1',
    abstract: 'this is the abstract of metadata 1',
    url: '',
    thumbnailUrl: '',
  },
  {
    title: 'metadata 2',
    abstract: 'this is the abstract of metadata 2',
    url: '',
    thumbnailUrl: '',
  },
  {
    title: 'metadata 3',
    abstract: 'this is the abstract of metadata 3',
    url: '',
    thumbnailUrl: '',
  },
  {
    title: 'metadata 4',
    abstract: 'this is the abstract of metadata 4',
    url: '',
    thumbnailUrl: '',
  },
]

const layouts = Object.values(ResultsListLayout)
export const ResultsListStory = () => ({
  component: ResultsListComponent,
  props: {
    layout: select('layout', layouts, layouts[0]),
    records: object('records', records),
  },
})
ResultsListStory.storyName = 'Results list'
