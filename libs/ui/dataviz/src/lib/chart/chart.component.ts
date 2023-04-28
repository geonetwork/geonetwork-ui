import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core'
import { InputChartType } from '@geonetwork-ui/util/types/data/dataviz-configuration.model'
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  Colors,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  ScatterController,
  Tooltip,
} from 'chart.js'

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
export class ChartComponent implements OnChanges, AfterViewInit {
  @Input() set data(value: object[]) {
    this.dataRaw = value
  }
  @Input() labelProperty: string
  @Input() valueProperty: string
  @Input() secondaryValueProperty: string
  @Input() type: InputChartType = 'bar'
  @ViewChild('chartCanvas') canvasRef: ElementRef<HTMLCanvasElement>

  private dataRaw: object[] = []

  chart: Chart<ChartType, unknown[]>
  ready = new Promise((resolve) => (this.setReady = resolve))
  setReady: (v?: unknown) => void

  ngAfterViewInit() {
    this.setReady()
  }

  ngOnChanges() {
    this.refreshChart()
  }

  createChart() {
    return new Chart(this.canvasRef.nativeElement, {
      type: this.getChartType(),
      data: this.getChartData(),
      options: this.getOptions(),
    })
  }

  getChartData(): ChartData {
    const data = this.handlesSecondaryValue()
      ? (this.getDataProxy(this.valueProperty, this.secondaryValueProperty) as [
          number,
          number
        ][])
      : (this.getDataProxy(this.valueProperty) as number[])
    return {
      labels: this.getDataProxy(this.labelProperty) as string[],
      datasets: [
        {
          label: this.valueProperty,
          data,
        },
      ],
    }
  }

  getOptions(): ChartOptions {
    const options: ChartOptions = {
      maintainAspectRatio: false, //always adapts the ratio to fill the container div with the canvas
      parsing: {},
    }
    switch (this.type) {
      case 'line-interpolated':
        return {
          ...options,
          elements: {
            line: {
              cubicInterpolationMode: 'monotone',
            },
          },
        }
      case 'bar-horizontal':
        return {
          ...options,
          indexAxis: 'y',
        }
      case 'pie':
        return {
          ...options,
          plugins: {
            legend: {
              position: 'left',
              align: 'start',
            },
          },
        }
      default:
        return options
    }
  }

  getChartType(): ChartType {
    switch (this.type) {
      case 'bar':
      case 'bar-horizontal':
        return 'bar'
      case 'line':
      case 'line-interpolated':
        return 'line'
      case 'scatter':
      case 'pie':
        return this.type
    }
  }

  handlesSecondaryValue(): boolean {
    return this.secondaryValueProperty && this.type === 'scatter'
  }

  private getDataProxy(
    property: string,
    secondaryProperty?: string
  ): unknown[] {
    return new Proxy<unknown[]>(this.dataRaw as any, {
      get: (target: any, index: string | symbol) => {
        if (
          typeof index === 'string' &&
          !Number.isNaN(parseInt(index)) &&
          target[index] !== undefined
        ) {
          if (secondaryProperty) {
            return {
              y: target[index][property],
              x: target[index][secondaryProperty],
            }
          } else {
            return target[index][property]
          }
        }
        return target[index]
      },
    })
  }

  async refreshChart() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
    await this.ready
    this.chart = this.createChart()
  }
}
