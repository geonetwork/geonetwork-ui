export const CHART_TYPE_VALUES = ['bar', 'line', 'scatter', 'pie'] as const

export type ChartType = typeof CHART_TYPE_VALUES[number]
