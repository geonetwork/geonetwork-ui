import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatavizService } from './dataviz.service'
import { DatavizController } from './dataviz.controller'
import { Dataviz } from './entities/dataviz.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Dataviz])],
  controllers: [DatavizController],
  providers: [DatavizService],
})
export class DatavizModule {}
