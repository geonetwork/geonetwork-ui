import { Injectable } from '@nestjs/common'
import { CreateDatavizDto } from './dto/create-dataviz.dto'
import { UpdateDatavizDto } from './dto/update-dataviz.dto'

@Injectable()
export class DatavizService {
  create(createDatavizDto: CreateDatavizDto) {
    return 'This action adds a new dataviz'
  }

  findAll() {
    return `This action returns all dataviz`
  }

  findOne(id: number) {
    return `This action returns a #${id} dataviz`
  }

  update(id: number, updateDatavizDto: UpdateDatavizDto) {
    return `This action updates a #${id} dataviz`
  }

  remove(id: number) {
    return `This action removes a #${id} dataviz`
  }
}
