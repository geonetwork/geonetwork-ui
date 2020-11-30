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
    ColorService.applyCssVariables('#1EA9D5', '#EF7749', '#2E353A', '#fff')
  }
}
