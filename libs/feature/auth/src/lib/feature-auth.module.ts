import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  AvatarServiceInterface,
  GravatarService,
} from '@geonetwork-ui/api/repository'

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: AvatarServiceInterface, useClass: GravatarService }],
})
export class FeatureAuthModule {}
