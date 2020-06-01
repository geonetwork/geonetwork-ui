import { NgModule } from '@angular/core'
import { ComponentsComponent } from './components.component'
import { MdListComponent } from './md-list/md-list.component'

@NgModule({
  declarations: [ComponentsComponent, MdListComponent],
  imports: [],
  exports: [ComponentsComponent],
})
export class ComponentsModule {}
