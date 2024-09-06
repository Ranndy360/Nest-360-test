import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { ApiBadRequestResponse, ApiBody, ApiGatewayTimeoutResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'src/conf/enum/swagger.enum';
import { HttpResponse } from 'src/conf/http/structure';
import { MailDto } from './dto/mail.dto';

@ApiTags('email-parser')
@Controller('api')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}


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
  @Get('email-parser')
  @ApiOperation({ summary: 'Email parser' })
  @ApiResponse({ status: 200, description: 'JSON response link of email attached' })
  async parser(@Query(ValidationPipe) mailDto: MailDto) {
    const result = await this.emailParserService.parseJson(
      mailDto.filePath,
    );
    return result;
  }

}
