import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { DEFAULT_LANG } from './i18n.constants'
import { Observable } from 'rxjs'
import { Injectable, Injector } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable()
export class I18nInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // we're injecting the service only when necessary to avoid circular dependencies
    const translate = this.injector.get(TranslateService)
    request = request.clone({
      setHeaders: {
        'Accept-Language': translate.currentLang || DEFAULT_LANG,
      },
    })
    return next.handle(request)
  }
}
