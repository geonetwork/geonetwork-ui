import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-apis',
  templateUrl: './record-apis.component.html',
  styleUrls: ['./record-apis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordApisComponent implements OnInit {
  maxHeight = ''
  selectedApiLink: DatasetServiceDistribution
  constructor(public facade: MdViewFacade) {}

  ngOnInit(): void {
    this.maxHeight = this.setMaxHeight(undefined)
    this.selectedApiLink = undefined
  }

  openRecordApiForm(link: DatasetServiceDistribution) {
    this.selectedApiLink = link
    this.maxHeight = this.setMaxHeight(link)
  }

  closeRecordApiForm() {
    this.selectedApiLink = undefined
    this.maxHeight = this.setMaxHeight(undefined)
  }

  setMaxHeight(link: DatasetServiceDistribution) {
    return `${link === undefined ? '0' : '428'}px`
  }
}
