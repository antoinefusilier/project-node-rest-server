import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesMongoService } from './coffees-mongo.service';

describe('CoffeesMongoService', () => {
  let service: CoffeesMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesMongoService],
    }).compile();

    service = module.get<CoffeesMongoService>(CoffeesMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
