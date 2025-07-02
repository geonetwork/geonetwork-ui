import { DatasetOnlineResource } from '../record'

export type AggregationTypes = 'count' | 'sum' | 'min' | 'max' | 'average'

export const CHART_TYPE_VALUES = [
  'bar',
  'bar-horizontal',
  'line',
  'line-interpolated',
  'scatter',
  'pie',
] as const

export type InputChartType = (typeof CHART_TYPE_VALUES)[number]

export interface DatavizChartConfigModel {
  xProperty: string
  yProperty: string
  aggregation: AggregationTypes
  chartType: InputChartType
}

export interface DatavizConfigModel {
  view: string
  source: DatasetOnlineResource
  chartConfig?: DatavizChartConfigModel
}
