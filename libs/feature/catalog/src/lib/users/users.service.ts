import { Injectable } from '@angular/core'
import { UsersApiService } from '@geonetwork-ui/data-access/gn4'
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$ = this.usersService.getUsers().pipe(shareReplay())

  constructor(private usersService: UsersApiService) {}
}
