import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDatavizDto } from './dto/create-dataviz.dto'
import { UpdateDatavizDto } from './dto/update-dataviz.dto'
import { Dataviz } from './entities/dataviz.entity'

@Injectable()
export class DatavizService {
  constructor(
    @InjectRepository(Dataviz)
    readonly repo: Repository<Dataviz>
  ) {}

  create(createDatavizDto: CreateDatavizDto) {
    return this.repo.save(createDatavizDto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(uuid: string) {
    return this.repo.findOneBy({ uuid })
  }

  update(id: number, updateDatavizDto: UpdateDatavizDto) {
    return this.repo.update(id, updateDatavizDto)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
