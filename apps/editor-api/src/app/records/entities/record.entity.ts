import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { OrganisationEntity } from '../../organisations/entities/organisation.entity'
import { RecordKind } from '../record.model'

@Entity('record')
export class RecordEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  identifier: number

  @Column()
  title: string

  @Column()
  abstract: string

  @Column()
  created: Date

  @Column()
  modified: Date

  @Column({ type: 'int' })
  kind: RecordKind

  @ManyToOne(() => OrganisationEntity, (org) => org.records)
  org: OrganisationEntity
}
