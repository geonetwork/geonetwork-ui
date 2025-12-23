import { NgModule, ModuleWithProviders, inject } from '@angular/core'
import { Configuration } from './configuration.js'
import { HttpClient } from '@angular/common/http'

import { AtomApiService } from './api/atom.api.service.js'
import { CustomstyleApiService } from './api/customstyle.api.service.js'
import { FormattersApiService } from './api/formatters.api.service.js'
import { GroupsApiService } from './api/groups.api.service.js'
import { HarvestersApiService } from './api/harvesters.api.service.js'
import { IdentifiersApiService } from './api/identifiers.api.service.js'
import { LanguagesApiService } from './api/languages.api.service.js'
import { LinksApiService } from './api/links.api.service.js'
import { LogosApiService } from './api/logos.api.service.js'
import { MapserversApiService } from './api/mapservers.api.service.js'
import { MapservicesApiService } from './api/mapservices.api.service.js'
import { MeApiService } from './api/me.api.service.js'
import { OperationsApiService } from './api/operations.api.service.js'
import { PagesApiService } from './api/pages.api.service.js'
import { ProcessesApiService } from './api/processes.api.service.js'
import { RecordsApiService } from './api/records.api.service.js'
import { RegionsApiService } from './api/regions.api.service.js'
import { RegistriesApiService } from './api/registries.api.service.js'
import { RelatedApiService } from './api/related.api.service.js'
import { SearchApiService } from './api/search.api.service.js'
import { SelectionsApiService } from './api/selections.api.service.js'
import { SiteApiService } from './api/site.api.service.js'
import { SourcesApiService } from './api/sources.api.service.js'
import { StandardsApiService } from './api/standards.api.service.js'
import { StatusApiService } from './api/status.api.service.js'
import { TagsApiService } from './api/tags.api.service.js'
import { ToolsApiService } from './api/tools.api.service.js'
import { UiApiService } from './api/ui.api.service.js'
import { UserfeedbackApiService } from './api/userfeedback.api.service.js'
import { UsersApiService } from './api/users.api.service.js'
import { UsersearchesApiService } from './api/usersearches.api.service.js'
import { UserselectionsApiService } from './api/userselections.api.service.js'

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [],
})
export class ApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    }
  }

  constructor() {
    const parentModule = inject(ApiModule, { optional: true, skipSelf: true })
    const http = inject(HttpClient, { optional: true })

    if (parentModule) {
      throw new Error(
        'ApiModule is already loaded. Import in your base AppModule only.'
      )
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      )
    }
  }
}
