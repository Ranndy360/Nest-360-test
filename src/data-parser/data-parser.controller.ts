import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { DataParserService } from './data-parser.service';
import { ApiBadRequestResponse, ApiBody, ApiGatewayTimeoutResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'src/conf/enum/swagger.enum';
import { HttpResponse } from 'src/conf/http/structure';
import SesSnsEventFormatedDto from './dto/ses-sns-event.formated.dto';
import { AWS_SES_SNS_EVENT_DTO } from './dto/aws.ses-sns-event.dto';
import SesSnsEventDto from './dto/ses-sns-event.req.dto';

@ApiTags('data-parser')
@Controller('api')
export class DataParserController {
  constructor(private readonly dataParserService: DataParserService) {}

  @ApiBody({
    schema: AWS_SES_SNS_EVENT_DTO,
  })
  @ApiResponse({ status: 200, type: SesSnsEventFormatedDto })
  @ApiBadRequestResponse({
    type: HttpResponse,
    description: Response.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: HttpResponse,
    description: Response.INTERNAL_SERVER_ERROR,
  })
  @ApiGatewayTimeoutResponse({
    type: HttpResponse,
    description: Response.API_GATEWAY_TIMEOUT,
  })
  @Post('data-parser')
  @ApiOperation({ summary: 'Parse data from AWS' })
  @ApiResponse({ status: 200, description: 'returns JSON response as structure requested' })
  easyOne(@Body(ValidationPipe) sesSnsEventDto: SesSnsEventDto,) {
    return this.dataParserService.parseData(sesSnsEventDto);
  }

}
