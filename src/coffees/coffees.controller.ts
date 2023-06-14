import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Patch, Delete, Query, Inject, UsePipes, ValidationPipe, SetMetadata } from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiGatewayTimeoutResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist';
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService, @Inject(REQUEST) private readonly request: Request){}

    // @SetMetadata('isPublic',true)
    @ApiGatewayTimeoutResponse({description: 'Timeout response...'})
    @ApiForbiddenResponse({description: 'Forbidden ...'})
    @Public()
    @UsePipes(ValidationPipe)
    @Get()
    async findAll(
        @Protocol('https') protocol: string,
        @Query() paginationQueryL: PaginationQueryDto) {

        return this.coffeesService.findAll(paginationQueryL);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
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
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto){

        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
    }
}
