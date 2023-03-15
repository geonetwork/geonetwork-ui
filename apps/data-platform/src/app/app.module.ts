import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatavizModule } from './dataviz/dataviz.module'

@Module({
  imports: [
    DatavizModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      migrations: ['dist/orm/migration/*.js'],
    }),
  ],
})
export class AppModule {}
