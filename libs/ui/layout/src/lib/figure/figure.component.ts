import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FigureComponent {
  @Input() icon: string
  @Input() title: string
  @Input() figure: string
  @Input() unit: string
}
