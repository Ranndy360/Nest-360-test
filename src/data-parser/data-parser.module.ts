import { Module } from '@nestjs/common';
import { DataParserService } from './data-parser.service';
import { DataParserController } from './data-parser.controller';

@Module({
  controllers: [DataParserController],
  providers: [DataParserService],
})
export class DataParserModule {}
