import { Component, inject, OnInit } from '@angular/core'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import {
  handleScrollOnNavigation,
  ThemeService,
} from '@geonetwork-ui/util/shared'
import { SearchRouterContainerDirective } from '@geonetwork-ui/feature/router'
import { Router, RouterOutlet } from '@angular/router'
import { CommonModule, ViewportScroller } from '@angular/common'

@Component({
  selector: 'datahub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, SearchRouterContainerDirective],
})
export class AppComponent implements OnInit {
  private router = inject(Router)
  private viewportScroller = inject(ViewportScroller)

  ngOnInit(): void {
    // Disable automatic scroll restoration to avoid race conditions
    this.viewportScroller.setHistoryScrollRestoration('manual')
    handleScrollOnNavigation(this.router, this.viewportScroller)
    ThemeService.applyCssVariables(
      getThemeConfig().PRIMARY_COLOR,
      getThemeConfig().SECONDARY_COLOR,
      getThemeConfig().MAIN_COLOR,
      getThemeConfig().BACKGROUND_COLOR,
      getThemeConfig().MAIN_FONT || "'Rubik', sans-serif",
      getThemeConfig().TITLE_FONT || "'Readex Pro', sans-serif",
      getThemeConfig().FONTS_STYLESHEET_URL || 'assets/css/default-fonts.css'
    )
    ThemeService.generateBgOpacityClasses(
      'primary',
      getThemeConfig().PRIMARY_COLOR,
      [10, 25, 50, 75, 100]
    )

    const favicon = getThemeConfig().FAVICON
    if (favicon) ThemeService.setFavicon(favicon)
  }
}
