import { PartialType } from '@nestjs/mapped-types'
import { CreateDatavizDto } from './create-dataviz.dto.js'

export class UpdateDatavizDto extends PartialType(CreateDatavizDto) {}
