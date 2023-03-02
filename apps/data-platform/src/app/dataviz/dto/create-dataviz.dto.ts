import { ApiProperty } from '@nestjs/swagger'
import { DatavizConfigModel } from '../dataviz.model'

export class CreateDatavizDto {
  @ApiProperty({
    example: 'fdee7935-11cf-4d4d-a173-5c952542bb24',
    description: 'Metadata uuid',
  })
  uuid: string

  @ApiProperty({
    example: { xaxis: 'time', yaxis: 'value' },
    description: 'Configuration of default dataviz for the metadata',
  })
  config: DatavizConfigModel
}
