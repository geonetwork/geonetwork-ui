import { IsDate, IsNumber, IsObject, IsString } from 'class-validator'
import { OrganisationEntity } from '../../organisations/entities/organisation.entity'
import { RecordKind } from '../record.model'

export class CreateRecordDto {
  @IsNumber()
  identifier: number

  @IsString()
  title: string

  @IsString()
  abstract: string

  @IsDate()
  created: Date

  @IsDate()
  modified: Date

  @IsNumber()
  kind: RecordKind

  @IsObject()
  org: OrganisationEntity
}
