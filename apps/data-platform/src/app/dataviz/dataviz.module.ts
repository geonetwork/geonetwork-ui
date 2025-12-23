import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatavizService } from './dataviz.service.js'
import { DatavizController } from './dataviz.controller.js'
import { Dataviz } from './entities/dataviz.entity.js'

@Module({
  imports: [TypeOrmModule.forFeature([Dataviz])],
  controllers: [DatavizController],
  providers: [DatavizService],
})
export class DatavizModule {}
