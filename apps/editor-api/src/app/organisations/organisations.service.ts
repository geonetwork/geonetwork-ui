import { Injectable } from '@nestjs/common'
import { CreateOrganisationDto } from './dto/create-organisation.dto'
import { UpdateOrganisationDto } from './dto/update-organisation.dto'

@Injectable()
export class OrganisationsService {
  create(createOrganisationDto: CreateOrganisationDto) {
    return 'This action adds a new organisation'
  }

  findAll() {
    return `This action returns all organisations`
  }

  findOne(id: number) {
    return `This action returns a #${id} organisation`
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`
  }
}
