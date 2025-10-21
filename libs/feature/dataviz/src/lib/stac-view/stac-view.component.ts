import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { TranslatePipe } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-stac-view',
  templateUrl: './stac-view.component.html',
  styleUrls: ['./stac-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslatePipe],
})
export class StacViewComponent implements OnDestroy {
  @Input() link: DatasetServiceDistribution
  private subscription = new Subscription()

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
