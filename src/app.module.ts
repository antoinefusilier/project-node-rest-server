import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { CoffeesMongoModule } from './coffees-mongo/coffees-mongo.module';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
         type: 'postgres',
        host: configService.get("DATABASE_HOST"),
        port: +configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: true
      })
     
    }),
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    CoffeesModule, 
    CoffeeRatingModule, 
    DatabaseModule, CommonModule, CoffeesMongoModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {

  constructor(configService: ConfigService){
    console.log("DB PWD",configService.get("DATABASE_USER"))
    console.log("DB PWD",configService.get("DATABASE_PASSWORD"))
    console.log("DB PWD",typeof(configService.get("DATABASE_PASSWORD")))

  }
}
