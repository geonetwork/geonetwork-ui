import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core'
import { TableItemModel } from '@geonetwork-ui/ui/layout'
import { FigureService } from '../figure.service'
import { openDataset } from '@geonetwork-ui/data-fetcher'

@Component({
  selector: 'gn-ui-figure-container',
  templateUrl: './figure-container.component.html',
  styleUrls: ['./figure-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FigureContainerComponent implements OnChanges {
  @Input() dataset: TableItemModel[]
  @Input() expression: string
  @Input() icon: string
  @Input() title: string
  @Input() unit: string
  @Input() digits?: number = 2
  figure: string

  constructor(private service: FigureService) {}

  ngOnChanges(): void {
    // all items with all columns
    openDataset('http://bla.org/dataset.csv').all().read()
    // [
    //   {
    //     id: '001',
    //     age: 20,
    //     name: 'john',
    //     gender: 'm'
    //   },
    //   {
    //     id: '002',
    //     age: 35,
    //     name: 'bob',
    //     gender: 'm'
    //   },
    //   {
    //     id: '003',
    //     age: 17,
    //     name: 'donna',
    //     gender: 'f'
    //   },
    // ]

    // with sort and filter
    openDataset('http://bla.org/dataset.csv')
      .all()
      .orderBy('age')
      .where(['<=', 'age', 20])
      .read()
    // [
    //   {
    //     id: '003',
    //     age: 17,
    //     name: 'donna',
    //     gender: 'f'
    //   },
    //   {
    //     id: '001',
    //     age: 20,
    //     name: 'john',
    //     gender: 'm'
    //   },
    // ]

    // compute an average on one column
    openDataset('http://bla.org/dataset.csv').select(['average', 'age']).read()
    // [
    //   {
    //     average(age): 24.0
    //   }
    // ]

    // compute count and sum of each unique value in a column
    openDataset('http://bla.org/dataset.json')
      .select(['distinct', 'gender'], ['count'], ['sum', 'age'])
      .read()
    // [
    //   {
    //     distinct(gender): 'm',
    //     count(): 2,
    //     sum(age): 55
    //   },
    //   {
    //     distinct(gender): 'f',
    //     count(): 1,
    //     sum(age): 17
    //   }
    // ]

    // const figure = this.service
    //   .compute(this.expression, this.dataset)
    //   .toFixed(this.digits)
    // this.figure = parseFloat(figure).toString()
  }
}
