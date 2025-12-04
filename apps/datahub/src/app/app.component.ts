import { Component, inject, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { ThemeService } from '@geonetwork-ui/util/shared'
import { distinctUntilChanged, filter, map } from 'rxjs'
import { SeoService } from './router/datahub-seo.service'

@Component({
  selector: 'datahub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private router = inject(Router)
  private seoService = inject(SeoService)

  ngOnInit(): void {
    const favicon = getThemeConfig().FAVICON
    if (favicon) ThemeService.setFavicon(favicon)

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects.split('?')[0]),
        distinctUntilChanged()
      )
      .subscribe(() => {
        // currently only called on path changes
        this.seoService.updateCanonicalUrl()
      })
  }
}
