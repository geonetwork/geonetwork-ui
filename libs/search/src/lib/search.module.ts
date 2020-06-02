import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './state/reducer'
import { SortByComponent } from './sort-by/sort-by.component'
import { UiModule } from '@lib/ui'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [SortByComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
    UiModule,
  ],
  exports: [SortByComponent],
})
export class LibSearchModule {}
