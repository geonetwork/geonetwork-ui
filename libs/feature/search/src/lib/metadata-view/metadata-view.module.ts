import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { MdViewFacade } from './state/mdview.facade'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(MD_VIEW_FEATURE_STATE_KEY, reducer),
  ],
  providers: [MdViewFacade],
  exports: [],
})
export class MdViewModule {}
