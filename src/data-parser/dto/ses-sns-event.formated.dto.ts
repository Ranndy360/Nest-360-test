import { IsBoolean, IsString, IsArray } from 'class-validator';

//DTO that contains base structure of data
class SesSnsEventFormatedDto {
  @IsBoolean()
  spam: boolean;

  @IsBoolean()
  virus: boolean;

  @IsBoolean()
  dns: boolean;

  @IsString()
  mes: string;

  @IsBoolean()
  retrasado: boolean;

  @IsString()
  emisor: string;

  @IsArray()
  receptor: string[];
}

export default SesSnsEventFormatedDto;
