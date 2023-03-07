export const CHART_TYPE_VALUES = [
  'bar',
  'bar-horizontal',
  'line',
  'line-interpolated',
  'scatter',
  'pie',
] as const

export type InputChartType = typeof CHART_TYPE_VALUES[number]
