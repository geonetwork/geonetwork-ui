import { Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-spinning-loader',
  templateUrl: './spinning-loader.component.html',
  styleUrls: ['./spinning-loader.component.css'],
  standalone: true,
})
export class SpinningLoaderComponent {
  @Input() layoutClasses = 'h-8 w-8 text-primary'
}
