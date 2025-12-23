import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core'
import { FigureComponent, TableItemModel } from '@geonetwork-ui/ui/dataviz'
import { FigureService } from '../figure.service.js'

@Component({
  selector: 'gn-ui-figure-container',
  templateUrl: './figure-container.component.html',
  styleUrls: ['./figure-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FigureComponent],
})
export class FigureContainerComponent implements OnChanges {
  private service = inject(FigureService)

  @Input() dataset: TableItemModel[]
  @Input() expression: string
  @Input() icon: string
  @Input() title: string
  @Input() unit: string
  @Input() digits?: number = 2
  figure: string

  ngOnChanges(): void {
    const figure = this.service
      .compute(this.expression, this.dataset)
      .toFixed(this.digits)
    this.figure = parseFloat(figure).toString()
  }
}
