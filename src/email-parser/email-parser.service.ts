import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { dataFromAttachment, dataFromBody } from 'src/conf/utils/email.utils';
import * as fs from 'fs';

@Injectable()
export class EmailParserService {

  //read the email, extract data attached or by url
  async parseJson(filePath: string): Promise<any> {
    const emailContent = fs.readFileSync(filePath);
    const parsedMail = await simpleParser(emailContent);

    const jsonFromAttachment = dataFromAttachment(parsedMail);
    if (jsonFromAttachment) {
      return jsonFromAttachment;
    }

    return await dataFromBody(parsedMail);
  }

}
