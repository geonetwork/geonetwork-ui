import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  ScatterController,
  Tooltip,
  Colors,
  Legend,
  ChartType,
} from 'chart.js'
import { InputChartType } from './chart.model'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  ScatterController,
  Tooltip,
  Colors,
  Legend
)

@Component({
  standalone: true,
  selector: 'gn-ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements AfterViewInit {
  private xAxisValue: string
  private yAxisValue: string
  private chartTypeValue: InputChartType

  chart: Chart

  @Input() data: Array<unknown>
  @Input() set xAxis(value: string) {
    if (this.xAxisValue) {
      this.xAxisValue = value
      this.updateChartData()
    } else {
      this.xAxisValue = value
    }
  }
  @Input() set yAxis(value: string) {
    if (this.yAxisValue) {
      this.yAxisValue = value
      this.updateChartData()
    } else {
      this.yAxisValue = value
    }
  }
  @Input() set chartType(value: InputChartType) {
    this.chartTypeValue && this.changeChartType(value)
    this.chartTypeValue = value
  }
  @ViewChild('chartCanvas') canvasRef: ElementRef<HTMLCanvasElement>

  ngAfterViewInit() {
    this.createChart()
  }

  createChart() {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: this.getChartType(),
      data: this.getMappedData(),
      options: {
        aspectRatio: 2.5,
        ...(this.chartTypeValue === 'scatter' && {
          scales: {
            x: {
              type: 'category',
            },
          },
        }),
        ...(this.chartTypeValue === 'bar' && {
          indexAxis: 'y',
        }),
        ...(this.chartTypeValue === 'curve' && {
          cubicInterpolationMode: 'monotone',
        }),
      },
    })
  }

  getMappedData() {
    return {
      labels: this.data?.map((row) => row[this.xAxisValue]),
      datasets: [
        {
          label: this.yAxisValue,
          data: this.data?.map((row) => row[this.yAxisValue]),
        },
      ],
    }
  }

  getChartType(): ChartType {
    const chartTypeMapping = {
      bar: 'bar',
      column: 'bar',
      line: 'line',
      curve: 'line',
      scatter: 'scatter',
      pie: 'pie',
    }
    return chartTypeMapping[this.chartTypeValue] as ChartType
  }

  changeChartType(type: InputChartType) {
    // recreate chart to make chartjs automatically use multiple colors
    // for pie chart and one color for other types
    this.chart.destroy()
    this.chartTypeValue = type
    this.createChart()
  }

  updateChartData() {
    this.chart.config.data = this.getMappedData()
    this.chart.update()
  }
}
