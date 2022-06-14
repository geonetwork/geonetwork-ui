import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { RecordKind } from './record.model'

@Entity()
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
}
