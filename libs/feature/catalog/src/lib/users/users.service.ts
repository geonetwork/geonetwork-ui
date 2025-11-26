import { Injectable, inject } from '@angular/core'
import { UsersApiService } from '@geonetwork-ui/data-access/gn4'
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersService = inject(UsersApiService)

  users$ = this.usersService.getUsers().pipe(shareReplay())
}
