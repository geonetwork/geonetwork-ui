import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { MdViewEffects } from './state/mdview.effects'
import { MdViewFacade } from './state/mdview.facade'
import { MD_VIEW_FEATURE_STATE_KEY, reducer } from './state/mdview.reducer'
import { MetadataFullViewComponent } from './metadata-full-view/metadata-full-view.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

@NgModule({
  declarations: [MetadataFullViewComponent],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature(MD_VIEW_FEATURE_STATE_KEY, reducer),
    EffectsModule.forFeature([MdViewEffects]),
    UiLayoutModule,
    MatTabsModule,
    MatIconModule,
  ],
  providers: [MdViewFacade],
  exports: [MetadataFullViewComponent],
})
export class MdViewModule {}
