import { Component, OnInit } from '@angular/core'
import { ThemeService } from '@geonetwork-ui/util/shared'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'md-editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'metadata-editor'

  ngOnInit(): void {
    const favicon = getThemeConfig().FAVICON
    if (favicon) ThemeService.setFavicon(favicon)
  }
}
