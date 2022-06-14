import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecordController } from './record.controller'
import { RecordEntity } from './record.entity'
import { RecordService } from './record.service'

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
