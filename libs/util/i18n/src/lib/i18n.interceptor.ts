import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { DEFAULT_LANG } from './i18n.constants'

@Injectable()
export class I18nInterceptor implements HttpInterceptor {
  constructor(private translate: TranslateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Accept-Language': this.translate.currentLang || DEFAULT_LANG,
      },
    })
    return next.handle(request)
  }
}
