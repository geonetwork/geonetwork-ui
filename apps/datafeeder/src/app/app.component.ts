import { Component, OnInit } from '@angular/core'
import { ColorService } from '@lib/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'datafeeder'

  ngOnInit() {
    ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
