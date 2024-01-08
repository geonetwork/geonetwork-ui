import { Component, OnInit } from '@angular/core'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { ThemeService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'datahub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const favicon = getThemeConfig().FAVICON
    if (favicon) ThemeService.setFavicon(favicon)
  }
}
