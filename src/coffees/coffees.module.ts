import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { DataSource } from 'typeorm';
class MockCoffeesService {}
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class coffeeBrandsFactory {
    create () {
        return ['buddy brey', 'nescafe']
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], 
    controllers: [CoffeesController], 
    providers: [
        {
            provide: CoffeesService,
            useClass: CoffeesService,
            useValue: new MockCoffeesService()
        },
        {
            provide: COFFEE_BRANDS,
            useValue: ['buddy brey', 'nescafe']
        },
        {
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory: coffeeBrandsFactory) => brandsFactory.create(),
            inject: [coffeeBrandsFactory],
            scope: Scope.TRANSIENT
        },{
          provide: ConfigService,
          useClass:
            process.env.NODE_ENV === 'development'
              ? DevelopmentConfigService
              : ProductionConfigService,
        },{
            provide: COFFEE_BRANDS,
            useFactory: async (datasource: DataSource): Promise<string[]> => {
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                return coffeeBrands;
            },
            inject: [DataSource]
        }
    ],
    exports: [CoffeesService]
})
export class CoffeesModule {}
    