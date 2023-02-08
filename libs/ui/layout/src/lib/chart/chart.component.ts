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
} from 'chart.js'
import { ChartType } from './chart.model'

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
  selector: 'gn-ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements AfterViewInit {
  private xAxisValue
  private yAxisValue
  private chartTypeValue

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
  @Input() set chartType(value: ChartType) {
    this.chartTypeValue && this.changeChartType(value)
    this.chartTypeValue = value
  }
  @ViewChild('chartCanvas') canvasRef: ElementRef<HTMLCanvasElement>

  ngAfterViewInit() {
    this.createChart()
  }

  createChart() {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: this.chartTypeValue,
      data: this.getMappedData(),
      options: {
        aspectRatio: 2.5,
      },
    })
  }

  getMappedData() {
    return {
      labels: this.data.map((row) => row[this.xAxisValue]),
      datasets: [
        {
          label: this.yAxisValue,
          data: this.data.map((row) => row[this.yAxisValue]),
        },
      ],
    }
  }

  changeChartType(type: ChartType) {
    this.chart.config.type = type
    this.chart.update()
  }

  updateChartData() {
    this.chart.config.data = this.getMappedData()
    this.chart.update()
  }
}
