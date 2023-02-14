export const CHART_TYPE_VALUES = [
  'column',
  'bar',
  'line',
  'curve',
  'scatter',
  'pie',
] as const

export type InputChartType = typeof CHART_TYPE_VALUES[number]
