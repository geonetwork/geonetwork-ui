import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AvatarServiceInterface } from './avatar/avatar.service.interface'
import { GravatarService } from './avatar/gravatar.service'

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: AvatarServiceInterface, useClass: GravatarService }],
})
export class FeatureAuthModule {}
