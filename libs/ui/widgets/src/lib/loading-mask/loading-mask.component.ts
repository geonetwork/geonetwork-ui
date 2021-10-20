import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'

@Component({
  selector: 'gn-ui-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingMaskComponent {
  @Input() message: string
}
