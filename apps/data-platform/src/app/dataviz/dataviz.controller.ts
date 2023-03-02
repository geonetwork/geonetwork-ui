import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DatavizService } from './dataviz.service'
import { CreateDatavizDto } from './dto/create-dataviz.dto'
import { UpdateDatavizDto } from './dto/update-dataviz.dto'
import { Dataviz } from './entities/dataviz.entity'

@ApiTags('Dataviz')
@Controller('dataviz')
export class DatavizController {
  constructor(private readonly datavizService: DatavizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a dataviz configuration' })
  @ApiBody({
    type: CreateDatavizDto,
    examples: {
      default: {
        $ref: 'CreateDatavizDto',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the created dataviz.',
    type: Dataviz,
  })
  @ApiResponse({
    status: 400,
    description: 'A dataviz with the same identifier was already existing.',
  })
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
