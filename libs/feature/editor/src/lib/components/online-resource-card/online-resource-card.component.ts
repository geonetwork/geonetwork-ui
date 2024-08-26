import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gn-ui-online-resource-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './online-resource-card.component.html',
  styleUrls: ['./online-resource-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineResourceCardComponent {

}
