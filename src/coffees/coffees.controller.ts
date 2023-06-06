import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Patch, Delete, Query } from '@nestjs/common';

import {CoffeesService} from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService){}

    @Get()
    findAll(@Query() paginationQueryL: PaginationQueryDto) {

        return this.coffeesService.findAll(paginationQueryL);
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        console.log(typeof id)
        return this.coffeesService.findOne(''+id);
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto)
        // return `This action creates a coffee`;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){

        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
    }
}
