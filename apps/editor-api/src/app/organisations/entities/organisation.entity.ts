import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RecordEntity } from '../../records/entities/record.entity'

@Entity('organisation')
export class OrganisationEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  identifier: number

  @Column({ unique: true, nullable: false })
  name: string

  @Column()
  abstract: string

  @Column()
  logoUrl: string

  @OneToMany((type) => RecordEntity, (record) => record.org)
  records: RecordEntity[]
}
