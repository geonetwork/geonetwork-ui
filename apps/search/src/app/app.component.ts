import { Component, OnInit } from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'search'

  ngOnInit(): void {
    ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
