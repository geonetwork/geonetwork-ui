import { Component, OnInit } from '@angular/core'
import { ThemeService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'datafeeder'

  ngOnInit() {
    ThemeService.applyCssVariables('#1EA9D5', '#EF7749', '#2E353A', '#fff')
  }
}
