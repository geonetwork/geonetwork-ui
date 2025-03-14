import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import {
  BlockListComponent,
  ResourceWrapperComponent,
  Paginable,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/layout'
import { CommonModule } from '@angular/common'
import { LinkCardComponent } from '@geonetwork-ui/ui/elements'
import { LetDirective } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-record-otherlinks',
  templateUrl: './record-otherlinks.component.html',
  styleUrls: ['./record-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PreviousNextButtonsComponent,
    BlockListComponent,
    LinkCardComponent,
    ResourceWrapperComponent,
    LetDirective,
    TranslateModule,
  ],
})
export class RecordOtherlinksComponent implements AfterViewInit {
  otherLinks$ = this.facade.otherLinks$

  @ViewChild(ResourceWrapperComponent) resourceWrapper: ResourceWrapperComponent
  @ViewChild(BlockListComponent) list: BlockListComponent
  get paginableElement(): Paginable {
    return this.resourceWrapper || this.list
  }

  constructor(
    public facade: MdViewFacade,
    private changeDetector: ChangeDetectorRef
  ) {}

  updateView() {
    this.changeDetector.detectChanges()
  }

  ngAfterViewInit() {
    // this is required to show the pagination correctly
    this.changeDetector.detectChanges()
  }
}
