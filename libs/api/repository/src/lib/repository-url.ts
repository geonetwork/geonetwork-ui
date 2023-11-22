import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { Provider } from '@angular/core'

export function provideRepositoryUrl(
  urlFactory: string | (() => string)
): Provider {
  return {
    provide: Configuration,
    useFactory: () =>
      new Configuration({
        basePath: typeof urlFactory === 'function' ? urlFactory() : urlFactory,
      }),
  }
}
