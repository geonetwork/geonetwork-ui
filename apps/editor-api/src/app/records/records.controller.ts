import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateRecordDto } from './dto/create-record.dto'
import { UpdateRecordDto } from './dto/update-record.dto'
import { RecordEntity } from './entities/record.entity'
import { RecordsService } from './records.service'

@ApiTags('records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a record' })
  @ApiBody({
    type: CreateRecordDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the created record.',
    type: RecordEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'A record with the same identifier was already existing.',
  })
  create(@Body() createRecordDto: CreateRecordDto): Promise<RecordEntity> {
    return this.recordsService.create(createRecordDto)
  }

  @Get()
  @ApiOperation({ summary: 'Returns all records' })
  @ApiResponse({
    status: 200,
    description: 'The list of all records within the catalog.',
  })
  findAll() {
    return this.recordsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a record' })
  @ApiResponse({
    status: 200,
    description: 'Returns the record.',
    type: RecordEntity,
  })
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(+id, updateRecordDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id)
  }
}
