import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core'
import { FigureComponent, TableItemModel } from '@geonetwork-ui/ui/dataviz'
import { FigureService } from '../figure.service'

@Component({
  selector: 'gn-ui-figure-container',
  templateUrl: './figure-container.component.html',
  styleUrls: ['./figure-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FigureComponent],
})
export class FigureContainerComponent implements OnChanges {
  @Input() dataset: TableItemModel[]
  @Input() expression: string
  @Input() icon: string
  @Input() title: string
  @Input() unit: string
  @Input() digits?: number = 2
  figure: string

  constructor(private service: FigureService) {}

  ngOnChanges(): void {
    const figure = this.service
      .compute(this.expression, this.dataset)
      .toFixed(this.digits)
    this.figure = parseFloat(figure).toString()
  }
}
