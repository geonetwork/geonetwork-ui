import { Injectable } from '@angular/core'
import { TableItemModel } from '@geonetwork-ui/ui/dataviz'

type FigureOperationTypes = 'sum' | 'average'
type FigureOperationsModel = Record<
  FigureOperationTypes,
  (data: number[]) => number
>
export const FIGURE_OPERATION_DELIMITER = '|'

@Injectable({
  providedIn: 'root',
})
export class FigureService {
  private operations: FigureOperationsModel = {
    sum: (data) => data.reduce((sum, value) => (sum += value), 0),
    average: (data) => this.operations.sum(data) / data.length,
  }

  compute(expression: string, dataset: TableItemModel[]): number {
    try {
      const computing = expression.split(FIGURE_OPERATION_DELIMITER)[0]
      const column = expression.split(FIGURE_OPERATION_DELIMITER)[1]
      const data = dataset.map((row) => row[column])
      return this.operations[computing](data)
    } catch (e) {
      return NaN
    }
  }
}
