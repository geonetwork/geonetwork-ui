import { Injectable } from '@angular/core'
import { MdViewFacade } from '../state/mdview.facade'
import { map, startWith } from 'rxjs/operators'
import { LinkHelperService } from './link-helper.service'

@Injectable({
  providedIn: 'root',
})
export class LinkClassifierService {
  allLinks$ = this.facade.metadata$.pipe(
    map((record) => (this.helper.hasLinks(record) ? record.links : []))
  )
  dataLinks$ = this.allLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isDataLink(link)))
  )
  otherLinks$ = this.allLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isOtherLink(link)))
  )
  validMapLinks$ = this.allLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isValidLink(link))),
    map((links) => links.filter((link) => this.helper.isMapLink(link))),
    startWith([])
  )

  constructor(
    private facade: MdViewFacade,
    private helper: LinkHelperService
  ) {}
}
