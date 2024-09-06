import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailParserModule } from './email-parser/email-parser.module';
import { DataParserModule } from './data-parser/data-parser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo esté disponible en toda la aplicación
    }),
    EmailParserModule,
    DataParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
