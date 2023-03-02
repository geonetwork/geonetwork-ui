import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { DatavizConfigModel } from '../dataviz.model'

@Entity()
export class Dataviz {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false, name: 'metadata_uuid' })
  uuid: number

  @Column({
    type: 'jsonb',
  })
  config: DatavizConfigModel
}
