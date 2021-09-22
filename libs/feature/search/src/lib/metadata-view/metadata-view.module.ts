import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { MdViewEffects } from './state/mdview.effects'
import { MdViewFacade } from './state/mdview.facade'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'
import { DataTableComponent } from './data-table/data-table.component'

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature(MD_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
  ],
  providers: [MdViewFacade],
  exports: [DataTableComponent],
})
export class MdViewModule {}
