import { Component } from '@angular/core'
import { ColorService } from '../../../../libs/common/src/lib/color.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'search'

  constructor() {
    ColorService.applyCssVariables('#55c862', '#81bfb8', '#161429', '#fdfbff')
  }
}
