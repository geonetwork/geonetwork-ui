import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { DatavizService } from './dataviz.service'
import { CreateDatavizDto } from './dto/create-dataviz.dto'
import { UpdateDatavizDto } from './dto/update-dataviz.dto'

@Controller('dataviz')
export class DatavizController {
  constructor(private readonly datavizService: DatavizService) {}

  @Post()
  create(@Body() createDatavizDto: CreateDatavizDto) {
    return this.datavizService.create(createDatavizDto)
  }

  @Get()
  findAll() {
    return this.datavizService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datavizService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatavizDto: UpdateDatavizDto) {
    return this.datavizService.update(+id, updateDatavizDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datavizService.remove(+id)
  }
}
