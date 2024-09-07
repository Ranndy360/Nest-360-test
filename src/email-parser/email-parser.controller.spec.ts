import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserController } from './email-parser.controller';
import { EmailParserService } from './email-parser.service';
import { MailDto } from './dto/mail.dto';

describe('EmailParserController', () => {
  let controller: EmailParserController;
  let service: EmailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailParserController],
      providers: [EmailParserService],
    }).compile();

    controller = module.get<EmailParserController>(EmailParserController);
    service = module.get<EmailParserService>(EmailParserService);
  });

    it('should parse email with URL and return result', async () => {
      const mailDto: MailDto = {
        filePath: 'src/resources/test-data-parser-url.eml',
      };

      const expectedResult = { key: 'value' };

      jest
        .spyOn(service, 'parseJson')
        .mockResolvedValue(expectedResult);

      const result = await controller.parser(mailDto);

      expect(result).toEqual(expectedResult);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Test Email Parser', () => {
    it('should handle validation errors for path', async () => {
      const mailDto: MailDto = {
        filePath: '',
      };

      await expect(controller.parser(mailDto)).rejects.toThrow(
        "ENOENT: no such file or directory, open ''",
      );
    });
    
    it('should parse email with attachment and return result', async () => {
        
      const mailDto: MailDto = {
        filePath: 'src/resources/test-data-json-attached.eml',
      };

      const expectedResult = { key: 'value' };

      jest
        .spyOn(service, 'parseJson')
        .mockResolvedValue(expectedResult);

      const result = await controller.parser(mailDto);

      expect(result).toEqual(expectedResult);
    });

    it('should handle errors thrown by EmailParserService', async () => {
      const mailDto: MailDto = {
        filePath: 'src/resources/test-data-json-attached.eml',
      };

      const error = new Error('Service Error');

      jest.spyOn(service, 'parseJson').mockRejectedValue(error);

      await expect(controller.parser(mailDto)).rejects.toThrow(
        'Service Error',
      );
    });

  });
});
