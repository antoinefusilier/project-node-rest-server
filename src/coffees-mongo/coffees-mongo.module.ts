import { Module } from '@nestjs/common';
import { CoffeesMongoController } from './coffees-mongo.controller';
import { CoffeesMongoService } from './coffees-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee/coffee.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: Coffee.Schema,
      }
    ])
  ],
  controllers: [CoffeesMongoController],
  providers: [CoffeesMongoService]
})
export class CoffeesMongoModule {}
