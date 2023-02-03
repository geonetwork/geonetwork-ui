import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { ChartType } from 'chart.js'
import { ChartService } from '../chart.service'

@Component({
  selector: 'gn-ui-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent implements AfterViewInit {
  private xAxisValue
  private yAxisValue
  private chartTypeValue

  label: string[]
  @Input() data: Array<unknown>
  @Input() set xAxis(value: string) {
    if (this.xAxisValue) {
      this.label[2] = value
      this.chartService.updateXAxis(value, this.label.join(' '))
    }
    this.xAxisValue = value
  }
  @Input() set yAxis(value: string) {
    if (this.yAxisValue) {
      this.label[0] = value
      this.chartService.updateYAxis(value, this.label.join(' '))
    }
    this.yAxisValue = value
  }
  @Input() set chartType(value: ChartType) {
    this.chartTypeValue && this.chartService.changeChartType(value)
    this.chartTypeValue = value
  }
  @ViewChild('chartCanvas') canvasRef: ElementRef<HTMLCanvasElement>

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.label = [this.yAxisValue, 'par', this.xAxisValue] //TODO i18n
    this.chartService.createChart(
      this.canvasRef.nativeElement,
      this.data,
      this.xAxisValue,
      this.yAxisValue,
      this.label.join(' '),
      this.chartTypeValue
    )
  }
}
