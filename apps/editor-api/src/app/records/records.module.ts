import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecordEntity } from './entities/record.entity'
import { RecordsController } from './records.controller'
import { RecordsService } from './records.service'

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
