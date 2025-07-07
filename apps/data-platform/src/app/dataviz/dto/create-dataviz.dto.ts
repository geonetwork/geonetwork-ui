import { ApiProperty } from '@nestjs/swagger'
import { DatavizChartModel } from '../dataviz.model'

export class CreateDatavizDto {
  @ApiProperty({
    example: 'fdee7935-11cf-4d4d-a173-5c952542bb24',
    description: 'Metadata uuid',
  })
  uuid: string

  @ApiProperty({
    example: {
      xProperty: 'time',
      yProperty: 'value',
      aggregation: 'sum',
      chartType: 'bar',
    },
    description: 'Configuration of default dataviz for the metadata',
  })
  config: DatavizChartModel
}
