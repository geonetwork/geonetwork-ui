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
  @Input() data: Array<unknown>
  @Input() xAxis: string
  @Input() yAxis: string
  @Input() label: string
  @Input() chartType: ChartType
  @ViewChild('chartCanvas') canvasRef: ElementRef<HTMLCanvasElement>

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.chartService.createChart(
      this.canvasRef.nativeElement,
      this.data,
      this.xAxis,
      this.yAxis,
      this.label,
      this.chartType
    )
  }
}
