import { PartialType } from '@nestjs/mapped-types'
import { CreateOrganisationDto } from './create-organisation.dto'

export class UpdateOrganisationDto extends PartialType(CreateOrganisationDto) {}
