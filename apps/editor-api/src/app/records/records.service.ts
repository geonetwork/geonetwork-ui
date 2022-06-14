import { Injectable } from '@nestjs/common'
import { CreateRecordDto } from './dto/create-record.dto'
import { UpdateRecordDto } from './dto/update-record.dto'

@Injectable()
export class RecordsService {
  create(createRecordDto: CreateRecordDto) {
    return 'This action adds a new record'
  }

  findAll() {
    return `This action returns all records`
  }

  findOne(id: number) {
    return `This action returns a #${id} record`
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`
  }

  remove(id: number) {
    return `This action removes a #${id} record`
  }
}
