import { Test, TestingModule } from '@nestjs/testing';
import { DataParserController } from './data-parser.controller';
import { DataParserService } from './data-parser.service';

describe('DataParserController', () => {
  let controller: DataParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataParserController],
      providers: [DataParserService],
    }).compile();

    controller = module.get<DataParserController>(DataParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
