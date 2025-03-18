import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
} from '@angular/core'
import { BlockListComponent } from '../block-list/block-list.component'
import { CommonModule } from '@angular/common'
import { Paginable } from '../paginable.interface'
import { PaginationDotsComponent } from '../pagination-dots/pagination-dots.component'
import { TranslateModule } from '@ngx-translate/core'
import { PreviousNextButtonsComponent } from '../previous-next-buttons/previous-next-buttons.component'
import { delay, Subscription } from 'rxjs'

enum ComponentSize {
  LARGE = 'L',
  MEDIUM = 'M',
  SMALL = 'S',
  EXTRA_SMALL = 'XS',
}

@Component({
  selector: 'gn-ui-cards-subsections',
  templateUrl: './cards-subsections.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    BlockListComponent,
    TranslateModule,
    PreviousNextButtonsComponent,
  ],
})
export class CardsSubsectionsComponent implements AfterViewInit, OnDestroy {
  @Input() title: string
  @ViewChild(BlockListComponent) blockList: BlockListComponent
  @ContentChildren('block', { read: ElementRef, descendants: true })
  blocks: QueryList<ElementRef<HTMLElement>>

  private subscription: Subscription

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Initial setup
    if (this.blocks && this.blockList) {
      this.blockList.setBlocks(this.blocks)
    }

    // Subscribe to future changes
    this.subscription = this.blocks.changes
      .pipe(delay(0)) // Use delay to ensure ViewChild is updated
      .subscribe(() => {
        if (this.blockList) {
          this.blockList.setBlocks(this.blocks)
          this.changeDetector.markForCheck()
        }
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  get paginableElement(): Paginable {
    return this.blockList
  }
}
