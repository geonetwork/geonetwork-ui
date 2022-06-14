import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrganisationsModule } from './organisations/organisations.module'
import { RecordsModule } from './records/records.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'geonetwork',
      password: 'geonetwork',
      database: 'gneditor',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      migrations: ['dist/orm/migration/*.js'],
      cli: {
        migrationsDir: 'orm/migration',
      },
    }),
    OrganisationsModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
