import { inject, Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { catchError, combineLatest, of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TitleService } from './datahub-title.service'

@Injectable()
export class DatahubTemplatePageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title)
  private translateService = inject(TranslateService)
  private platformService = inject(PlatformServiceInterface)
  private titleService = inject(TitleService)

  constructor() {
    super()
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const pageTitle = this.buildTitle(routerState)

    if (!(pageTitle === 'entityTitle')) {
      this.titleService.setTitle(null)
    }

    if (pageTitle !== undefined) {
      combineLatest({
        titlePattern: this.platformService
          .translateKey('datahub-page-title-pattern')
          .pipe(catchError(() => of(null))),
        translatedPageTitle: this.translateService
          .get(pageTitle)
          .pipe(catchError(() => of(pageTitle))),
        translatedEntityTitle: this.titleService.title$.pipe(
          catchError(() => of(null))
        ),
      }).subscribe(
        ({ titlePattern, translatedPageTitle, translatedEntityTitle }) => {
          const formattedTitle = (
            titlePattern || '{pageTitle} | Datahub'
          ).replace('{pageTitle}', translatedEntityTitle || translatedPageTitle)
          this.title.setTitle(formattedTitle)
        }
      )
    } else {
      this.title.setTitle('Datahub')
    }
  }
}
