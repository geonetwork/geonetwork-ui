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
import { OrganisationEntity } from './entities/organisation.entity'
import { OrganisationsService } from './organisations.service'
import { CreateOrganisationDto } from './dto/create-organisation.dto'
import { UpdateOrganisationDto } from './dto/update-organisation.dto'

@ApiTags('organisations')
@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create organisation' })
  @ApiBody({
    type: CreateOrganisationDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the created organisation.',
    type: OrganisationEntity,
  })
  @ApiResponse({
    status: 400,
    description:
      'An organisation with the same identifier was already existing.',
  })
  create(
    @Body() createOrganisationDto: CreateOrganisationDto
  ): Promise<OrganisationEntity> {
    return this.organisationsService.create(createOrganisationDto)
  }

  @Get()
  @ApiOperation({ summary: 'Returns all organisations' })
  @ApiResponse({
    status: 200,
    description: 'The list of all organisations of the catalog.',
  })
  findAll() {
    return this.organisationsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organisation' })
  @ApiResponse({
    status: 200,
    description: 'Returns the organisation.',
    type: OrganisationEntity,
  })
  findOne(@Param('id') id: string) {
    return this.organisationsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto
  ) {
    return this.organisationsService.update(+id, updateOrganisationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationsService.remove(+id)
  }
}
