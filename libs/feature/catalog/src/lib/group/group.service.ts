import { Injectable } from '@angular/core'
import { GroupApiModel, GroupsApiService } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups$: Observable<GroupApiModel[]> = this.groupsApiService
    .getGroups()
    .pipe(shareReplay())

  constructor(private groupsApiService: GroupsApiService) {}
}
