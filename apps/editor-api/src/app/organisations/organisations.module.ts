import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganisationEntity } from './entities/organisation.entity'
import { OrganisationsService } from './organisations.service'
import { OrganisationsController } from './organisations.controller'

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationEntity])],
  controllers: [OrganisationsController],
  providers: [OrganisationsService],
})
export class OrganisationsModule {}
