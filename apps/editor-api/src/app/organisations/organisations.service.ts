import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrganisationDto } from './dto/create-organisation.dto'
import { UpdateOrganisationDto } from './dto/update-organisation.dto'
import { OrganisationEntity } from './entities/organisation.entity'

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(OrganisationEntity)
    readonly repo: Repository<OrganisationEntity>
  ) {}

  create(
    createOrganisationDto: CreateOrganisationDto
  ): Promise<OrganisationEntity> {
    return this.repo.save(createOrganisationDto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findOne(id)
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`
  }
}
