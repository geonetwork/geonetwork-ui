import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { TableItemModel } from '@geonetwork-ui/ui/layout'
import { FigureService } from '../figure.service'

@Component({
  selector: 'gn-ui-figure-container',
  templateUrl: './figure-container.component.html',
  styleUrls: ['./figure-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  ngOnChanges(changes: SimpleChanges): void {
    const figure = this.service
      .compute(this.expression, this.dataset)
      .toFixed(this.digits)
    this.figure = parseFloat(figure).toString()
  }
}
