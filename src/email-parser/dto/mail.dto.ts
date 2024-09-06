import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MailDto {
  @ApiProperty({
    description: 'Path to the email file',
    example: 'src/resources/test-data-parser-url.eml',
  })
  @IsNotEmpty()
  filePath: string;
}
