import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DataFacade } from '../state/data.facade'

@Component({
  selector: 'gn-ui-data-view-table',
  templateUrl: './data-view-table.component.html',
  styleUrls: ['./data-view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewTableComponent {
  constructor(protected dataFacade: DataFacade) {}

  selectLinkToDisplay(link: number) {
    this.dataFacade.selectedLinkIndex$.next(link)
  }

  onTableSelect(event) {
    console.log(event)
  }
}
