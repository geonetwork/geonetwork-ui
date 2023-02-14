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
  ChartOptions,
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
      this.updateChart()
    } else {
      this.xAxisValue = value
    }
  }
  @Input() set yAxis(value: string) {
    if (this.yAxisValue) {
      this.yAxisValue = value
      this.updateChart()
    } else {
      this.yAxisValue = value
    }
  }
  @Input() set chartType(value: InputChartType) {
    if (this.chartTypeValue) {
      this.chartTypeValue = value
      this.updateChart()
    } else {
      this.chartTypeValue = value
    }
  }
  @ViewChild('chartCanvas') canvasRef: ElementRef<HTMLCanvasElement>

  ngAfterViewInit() {
    this.createChart()
  }

  createChart() {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: this.getChartType(),
      data: {
        datasets: [
          {
            label: this.yAxisValue,
            data: this.data,
          },
        ],
      },
      options: this.getOptions(),
    })
  }

  getOptions(): ChartOptions {
    const options = {
      aspectRatio: 2.5,
      parsing: {
        xAxisKey: this.xAxisValue,
        yAxisKey: this.yAxisValue,
      },
    }
    switch (this.chartTypeValue) {
      case 'scatter':
        return {
          ...options,
          scales: {
            x: {
              type: 'category',
            },
          },
        }
      case 'curve':
        return {
          ...options,
          elements: {
            line: {
              cubicInterpolationMode: 'monotone',
            },
          },
        }
      case 'bar':
        return {
          ...options,
          indexAxis: 'y',
          parsing: {
            xAxisKey: this.yAxisValue,
            yAxisKey: this.xAxisValue,
          },
        }

      case 'pie':
        return {
          ...options,
          parsing: {
            key: this.yAxisValue,
          },
        }
      default:
        return options
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

  updateChart() {
    this.chart.destroy()
    this.createChart()
  }
}
