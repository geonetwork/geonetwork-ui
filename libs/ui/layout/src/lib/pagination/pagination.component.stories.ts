import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { PaginationComponent } from './pagination.component'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core'
import { Paginable } from '../paginable.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

@Component({
  selector: 'gn-ui-mock-list',
  template: `current page: {{ currentPage }}<br />
    <button
      type="button"
      class="underline hover:text-primary"
      (click)="goToPrevPage()"
    >
      decrease</button
    >&nbsp;
    <button
      type="button"
      class="underline hover:text-primary"
      (click)="goToNextPage()"
    >
      increase</button
    ><br />
    <div>pages count: {{ pagesCount }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MockListComponent implements Paginable {
  currentPage = 1
  pagesCount = 8
  constructor(private changeDetector: ChangeDetectorRef) {}
  get isFirstPage() {
    return this.currentPage == 1
  }
  get isLastPage() {
    return this.currentPage == this.pagesCount
  }
  goToPage(index: number) {
    this.currentPage = index
    this.changeDetector.detectChanges()
  }
  goToPrevPage() {
    if (this.isFirstPage) return
    this.goToPage(this.currentPage - 1)
  }
  goToNextPage() {
    if (this.isLastPage) return
    this.goToPage(this.currentPage + 1)
  }
}

export default {
  title: 'Layout/Pagination/PaginationComponent',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [MockListComponent],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 w-[600px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<PaginationComponent>

export const Primary: StoryObj<PaginationComponent> = {
  args: {
    hideButton: false,
  },
  argTypes: {
    hideButton: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    template: `
<gn-ui-pagination [hideButton]='hideButton' [listComponent]="list"></gn-ui-pagination>
<gn-ui-mock-list #list></gn-ui-mock-list>`,
  }),
}
