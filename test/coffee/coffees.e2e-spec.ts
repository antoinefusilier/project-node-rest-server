import { INestApplication, ValidationPipe, HttpStatus, HttpServer } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto/update-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwrek Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla']
  }
  const expectedPartialCoffee = expect.objectContaining({
    ...coffee,
    flavors: expect.arrayContaining(
      coffee.flavors.map(name => expect.objectContaining({ name })),
    ),
  });

  let app: INestApplication;
  let httpServer: HttpServer;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
    );
    await app.init();
  });

  it('Create [POST /]', ()=>{
    return request(app.getHttpServer())
        .post('/coffees')
        .send(coffee as CreateCoffeeDto)
        .expect(HttpStatus.CREATED)
        .then(({ body })=>{
            const expectedCoffee = jasmine.objectContaining({
                ...coffee,
                flavors: jasmine.arrayContaining(
                    coffee.flavors.map(name => jasmine.objectContaining({name}))
                )
            })
            expect(body).toEqual(expectedPartialCoffee)
        })
  });
  it('Get all [GET /]', ()=>{
    return request(httpServer)
        .get('/coffees')
        .then(({body}) => {

        })
  });
  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/coffees/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      ...coffee,
      name: 'New and Improved Shipwreck Roast'
    }
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .then(({ body }) => {
        expect(body.name).toEqual(updateCoffeeDto.name);

        return request(httpServer)
          .get('/coffees/1')
          .then(({ body }) => {
            expect(body.name).toEqual(updateCoffeeDto.name);
          });
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      })
  });

  afterAll(async () => {
    await app.close();
  });
});