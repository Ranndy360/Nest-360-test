import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import SesSnsEventDto from './dto/ses-sns-event.req.dto';
import SesSnsEventFormatedDto from './dto/ses-sns-event.formated.dto';

@Injectable()
export class DataParserService {
  //service to comunicate to dto to formated data
  parseData(sesSnsEventDto: SesSnsEventDto,
  ): SesSnsEventFormatedDto  {
    try {
      const eventDtoFirstRecord = sesSnsEventDto?.Records?.[0];

      if (!eventDtoFirstRecord) {
        throw new Error('No records in data structure found.');
      }

      return SesSnsEventDto.formatDto(eventDtoFirstRecord);
    } catch (error) {
      throw new NotFoundException(
        HttpException.createBody(error.message, error.name, error.status),
        error.status,
      );
    }
  }

}
