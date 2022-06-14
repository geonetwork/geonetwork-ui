import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrganisationEntity } from '../organisations/entities/organisation.entity'
import { CreateRecordDto } from './dto/create-record.dto'
import { UpdateRecordDto } from './dto/update-record.dto'
import { RecordEntity } from './entities/record.entity'

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(RecordEntity)
    readonly repo: Repository<RecordEntity>
  ) {}

  create(createRecordDto: CreateRecordDto): Promise<RecordEntity> {
    return this.repo.save(createRecordDto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findOne(id)
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`
  }

  remove(id: number) {
    return `This action removes a #${id} record`
  }
}
