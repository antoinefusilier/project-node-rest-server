import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Flavor } from "src/coffees/entities/flavor.entity/flavor.entity";

export class CreateCoffeeDto {
    @ApiProperty({ description: 'Name of coffee'})
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'Brand of coffee'})
    @IsString()
    readonly brand: string;

    @ApiProperty({ description: '...', examples: ['Chocolate', '...']})
    @IsString({each: true})
    readonly flavors: string[];
}
