import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { DatavizChartModel } from '../dataviz.model'

@Entity()
export class Dataviz {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '3',
    description: 'Configuration ID',
  })
  id: number

  @Column({
    unique: true,
    nullable: false,
    name: 'metadata_uuid',
    type: 'uuid',
  })
  @ApiProperty({
    example: 'fdee7935-11cf-4d4d-a173-5c952542bb24',
    description: 'Metadata uuid',
  })
  uuid: string

  @Column({
    type: 'jsonb',
  })
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
