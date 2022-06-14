import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { RecordEntity } from '../../records/entities/record.entity'

@Entity('organisation')
export class OrganisationEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  @Generated('uuid')
  identifier: number

  @Column({ unique: true, nullable: false })
  @ApiProperty({
    example: 'GeoNetwork',
    description: 'Name of the organisation',
  })
  name: string

  @Column()
  @ApiProperty({
    example: 'GeoNetwork is an open source community.',
    description: 'Description of the organisation',
  })
  description: string

  @Column()
  @ApiProperty({
    example: 'https://mydomain.org/logo.png',
    description:
      'URL of the logo of the organisation. You can use a base64 URL',
  })
  logoUrl: string

  @OneToMany((type) => RecordEntity, (record) => record.org)
  records: RecordEntity[]
}
