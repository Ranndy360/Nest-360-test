import { Test, TestingModule } from '@nestjs/testing';
import { DataParserController } from './data-parser.controller';
import { DataParserService } from './data-parser.service';
import SesSnsEventDto, { EventDto, MailDto, ReceiptDto } from './dto/ses-sns-event.req.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import SesSnsEventFormatedDto from './dto/ses-sns-event.formated.dto';
import { checkDnsVerdict, extractRecipient, extractSender, getMonthFromTimestamp } from 'src/conf/utils/validation.dto';

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

describe('Test Util Functions', () => {
  it('should get month name from timestamp correctly', () => {
    
    const timestamp = '2024-07-03T12:00:00Z';

    const month = getMonthFromTimestamp(timestamp);

    expect(month).toEqual('July');
  });

  it('should take recipient correctly', () => {
    
    const mailDto = new MailDto();
    mailDto.destination = [
      'recipient1@example.com',
      'recipient2@example.com',
    ];

    const recipients = mailDto.destination.map((email) =>
      extractRecipient(email),
    );
    
    expect(recipients).toEqual([
      'recipient1',
      'recipient2',
    ]);
  });

  it('should take sender correctly', () => {
      
    const mailDto = new MailDto();
    mailDto.source = 'ranndy360@example.com';

    const sender = extractSender(mailDto.source);

    expect(sender).toEqual('ranndy360');
  });

});

describe('Test Aws Dto Ses SNS', () => {
  describe('Format and validation', () => {
    it('should format and validate EventDto correctly', async () => {
      
      const validEventDto = new EventDto();
      validEventDto.eventVersion = '1.0';
      validEventDto.eventSource = 'source';

      const errors = await validate(validEventDto);
      const transformedDto = SesSnsEventDto.formatDto(validEventDto);

      expect(errors.length).toBe(0);
      expect(transformedDto).toBeDefined();
    });

    it('should format and validate ReceiptDto correctly', async () => {
      const validReceiptDto = new ReceiptDto();
      validReceiptDto.virusVerdict = { status: 'FAIL' };
      validReceiptDto.spfVerdict = { status: 'PASS' };
      validReceiptDto.dkimVerdict = { status: 'PASS' };
      validReceiptDto.timestamp = '2024-09-06T12:00:00Z';
      validReceiptDto.processingTimeMillis = 500;
      validReceiptDto.recipients = ['test@example.com'];
      validReceiptDto.spamVerdict = { status: 'PASS' };
      validReceiptDto.dmarcVerdict = { status: 'PASS' };
      validReceiptDto.dmarcPolicy = 'none';
      validReceiptDto.action = { type: 'action', topicArn: 'arn:topic' };

      const errors = await validate(validReceiptDto);
      const transformedDto = plainToClass(
        SesSnsEventFormatedDto,
        validReceiptDto,
      );

      expect(errors.length).toBe(0);
      expect(transformedDto).toBeDefined();
    });
  });

});