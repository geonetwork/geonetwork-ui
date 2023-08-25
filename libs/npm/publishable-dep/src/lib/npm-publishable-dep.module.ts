import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DepComponent } from './dep/dep.component'
import { UiWidgetsModule } from '@geonetwork-ui/ui-widgets'

@NgModule({
  imports: [CommonModule, UiWidgetsModule],
  declarations: [DepComponent],
  exports: [DepComponent],
})
export class NpmPublishableDepModule {}
