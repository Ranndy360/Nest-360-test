import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { dataFromAttachment, dataFromBody } from 'src/conf/utils/email.utils';
import * as fs from 'fs';

@Injectable()
export class EmailParserService {

  //read the email, extract data attached or by url
  async parseJson(filePath: string): Promise<any> {
    // Leer y parsear el correo electrónico
    const emailContent = fs.readFileSync(filePath);
    const parsedMail = await simpleParser(emailContent);

    // Intentar extraer JSON del adjunto
    const jsonFromAttachment = dataFromAttachment(parsedMail);
    if (jsonFromAttachment) {
      return jsonFromAttachment;
    }

    // Si no hay JSON en los adjuntos, extraer del cuerpo del correo o URL
    return await dataFromBody(parsedMail);
  }

}
