import { NgModule } from '@angular/core'
import { SearchComponent } from './search.component'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'

@NgModule({
  declarations: [SearchComponent],
  imports: [
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
  ],
  exports: [SearchComponent],
})
export class LibSearchModule {}
