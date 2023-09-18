import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  AvatarServiceInterface,
  GravatarService,
} from '@geonetwork-ui/api/repository/gn4'

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: AvatarServiceInterface, useClass: GravatarService }],
})
export class FeatureAuthModule {}
