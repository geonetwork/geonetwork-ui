import { AggregationTypes } from './data-api.model';
export declare const CHART_TYPE_VALUES: readonly ["bar", "bar-horizontal", "line", "line-interpolated", "scatter", "pie"];
export type InputChartType = typeof CHART_TYPE_VALUES[number];
export interface DatavizConfigurationModel {
    xProperty: string;
    yProperty: string;
    aggregation: AggregationTypes;
    chartType: InputChartType;
}
