import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm'
import { OrganisationEntity } from '../../organisations/entities/organisation.entity'
import { RecordKind } from '../record.model'

@Entity('record')
export class RecordEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  @Generated('uuid')
  identifier: number

  @Column()
  @ApiProperty({
    example: 'River of africa.',
    description: 'Title of the record',
  })
  title: string

  @Column()
  @ApiProperty({
    example: 'This is the metadata for the river of Africa.',
    description: 'Abstract of the record',
  })
  abstract: string

  @Column()
  @ApiProperty({
    example: '01-01-2022',
    description: 'Date of the creation of the record',
  })
  created: Date

  @Column()
  @ApiProperty({
    example: '01-06-2022',
    description: 'Date of the last modification of the record',
  })
  modified: Date

  @ApiProperty({
    example: 0,
    description: 'Kind of records. Could be 0 for service or 1 for dataset.',
  })
  @Column({ type: 'int' })
  kind: RecordKind

  @ManyToOne(() => OrganisationEntity, (org) => org.records)
  @ApiProperty({
    example: 1,
    description: 'Id of the organisation of the record',
  })
  org: OrganisationEntity
}
