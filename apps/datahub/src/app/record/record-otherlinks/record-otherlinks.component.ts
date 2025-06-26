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
  CarouselComponent,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/layout'
import { CommonModule } from '@angular/common'
import { ExternalLinkCardComponent } from '@geonetwork-ui/ui/elements'
import { LetDirective } from '@ngrx/component'
import { TranslateDirective } from '@ngx-translate/core'
import { map } from 'rxjs/operators'

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
    ExternalLinkCardComponent,
    CarouselComponent,
    LetDirective,
    TranslateDirective,
  ],
})
export class RecordOtherlinksComponent implements AfterViewInit {
  otherLinks$ = this.facade.otherLinks$

  get linksCount$() {
    return this.otherLinks$?.pipe(map((links) => links.length))
  }

  @ViewChild(CarouselComponent) carousel: CarouselComponent
  @ViewChild(BlockListComponent) list: BlockListComponent

  constructor(
    public facade: MdViewFacade,
    private changeDetector: ChangeDetectorRef
  ) {}

  updateView() {
    this.changeDetector.detectChanges()
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges()
  }
}
