import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatavizModule } from './dataviz/dataviz.module'

@Module({
  imports: [
    DatavizModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'geonetwork',
      password: 'geonetwork',
      database: 'gn-data-platform',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      migrations: ['dist/orm/migration/*.js'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
