import { Directive, Host } from '@angular/core'
import { MapManagerService } from './map-manager.service'

@Directive({
  selector: '[gnUiMapContainer]',
  providers: [MapManagerService],
})
export class MapContainerDirective {
  constructor(@Host() private manager: MapManagerService) {}
}
