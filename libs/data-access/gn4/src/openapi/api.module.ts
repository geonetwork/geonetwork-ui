import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core'
import { Configuration } from './configuration'
import { HttpClient } from '@angular/common/http'

import { AtomApiService } from './api/atom.api.service'
import { CustomstyleApiService } from './api/customstyle.api.service'
import { FormattersApiService } from './api/formatters.api.service'
import { GroupsApiService } from './api/groups.api.service'
import { HarvestersApiService } from './api/harvesters.api.service'
import { IdentifiersApiService } from './api/identifiers.api.service'
import { LanguagesApiService } from './api/languages.api.service'
import { LinksApiService } from './api/links.api.service'
import { LogosApiService } from './api/logos.api.service'
import { MapserversApiService } from './api/mapservers.api.service'
import { MapservicesApiService } from './api/mapservices.api.service'
import { MeApiService } from './api/me.api.service'
import { OperationsApiService } from './api/operations.api.service'
import { PagesApiService } from './api/pages.api.service'
import { ProcessesApiService } from './api/processes.api.service'
import { RecordsApiService } from './api/records.api.service'
import { RegionsApiService } from './api/regions.api.service'
import { RegistriesApiService } from './api/registries.api.service'
import { RelatedApiService } from './api/related.api.service'
import { SearchApiService } from './api/search.api.service'
import { SelectionsApiService } from './api/selections.api.service'
import { SiteApiService } from './api/site.api.service'
import { SourcesApiService } from './api/sources.api.service'
import { StandardsApiService } from './api/standards.api.service'
import { StatusApiService } from './api/status.api.service'
import { TagsApiService } from './api/tags.api.service'
import { ToolsApiService } from './api/tools.api.service'
import { UiApiService } from './api/ui.api.service'
import { UserfeedbackApiService } from './api/userfeedback.api.service'
import { UsersApiService } from './api/users.api.service'
import { UsersearchesApiService } from './api/usersearches.api.service'
import { UserselectionsApiService } from './api/userselections.api.service'

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

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
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
