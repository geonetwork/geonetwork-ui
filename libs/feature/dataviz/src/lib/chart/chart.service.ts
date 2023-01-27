import { Injectable } from '@angular/core'
import Chart, { ChartType } from 'chart.js/auto'

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  chart: Chart

  createChart(
    canvasContext: HTMLCanvasElement,
    data: Array<unknown>,
    xAxis: string,
    yAxis: string,
    label: string,
    type: ChartType
  ) {
    this.chart = new Chart(canvasContext, {
      type: type,
      data: this.mapData(data, xAxis, yAxis, label),
      options: {
        aspectRatio: 2.5,
      },
    })
  }

  mapData(data: Array<unknown>, xAxis: string, yAxis: string, label: string) {
    return {
      labels: data.map((row) => row[xAxis]),
      datasets: [
        {
          label,
          data: data.map((row) => row[yAxis]),
        },
      ],
    }
  }

  changeChartType(type: ChartType) {
    this.chart.config.type = type
    this.chart.update()
  }
}
