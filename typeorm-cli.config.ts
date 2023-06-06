import { Coffee } from "src/coffees/entities/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity/flavor.entity";
import { CoffeeRefactor1686059030545 } from "src/migration/1686059030545-CoffeeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Coffee, Flavor],
    migrations: [CoffeeRefactor1686059030545]
    // npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.conf
})