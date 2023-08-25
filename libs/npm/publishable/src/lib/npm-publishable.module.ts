import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RandomComponent } from './random/random.component'
import { NpmPublishableDepModule } from '@gnui/publishable-dep'

@NgModule({
  imports: [CommonModule, NpmPublishableDepModule],
  declarations: [RandomComponent],
  exports: [RandomComponent],
})
export class NpmPublishableModule {}
