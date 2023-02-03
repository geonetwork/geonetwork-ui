import { Injectable } from '@angular/core'
import Chart, { ChartType } from 'chart.js/auto'

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  chart: Chart
  xAxis: string
  yAxis: string
  label: string
  rawData: Array<unknown>

  createChart(
    canvasContext: HTMLCanvasElement,
    data: Array<unknown>,
    xAxis: string,
    yAxis: string,
    label: string,
    type: ChartType
  ) {
    this.setData(data, xAxis, yAxis, label)
    this.chart = new Chart(canvasContext, {
      type: type,
      data: this.getMappedData(),
      options: {
        aspectRatio: 2.5,
      },
    })
  }

  private setData(
    data: Array<unknown>,
    xAxis: string,
    yAxis: string,
    label: string
  ) {
    this.xAxis = xAxis
    this.yAxis = yAxis
    this.label = label
    this.rawData = data
  }

  getMappedData() {
    return {
      labels: this.rawData.map((row) => row[this.xAxis]),
      datasets: [
        {
          label: this.label,
          data: this.rawData.map((row) => row[this.yAxis]),
        },
      ],
    }
  }

  changeChartType(type: ChartType) {
    this.chart.config.type = type
    this.chart.update()
  }

  updateXAxis(xAxis: string, label: string) {
    this.xAxis = xAxis
    this.label = label
    this.chart.config.data = this.getMappedData()
    this.chart.update()
  }

  updateYAxis(yAxis: string, label: string) {
    this.yAxis = yAxis
    this.label = label
    this.chart.config.data = this.getMappedData()
    this.chart.update()
  }
}
