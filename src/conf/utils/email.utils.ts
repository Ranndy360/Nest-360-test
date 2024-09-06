import { ParsedMail } from 'mailparser';


/**
 * Get data from the body of the email, search for the url to get the json structure
 */
export async function dataFromBody(
    parsedMail: ParsedMail,
  ): Promise<any> {
    const textBody = parsedMail.text || '';
  
    const jsonUrlRegex = /(https?:\/\/[^\s]+)/g;
    let match;
    while ((match = jsonUrlRegex.exec(textBody)) !== null) {
      const url = match[1];
      try {
        const response = await fetch(url);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return await response.json();
          }
        } else {
          throw new Error(
            `Failed to fetch JSON from ${url}: ${response.statusText}`,
          );
        }
      } catch (error) {
        throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
      }
    }
  
    throw new Error('No JSON found in email body');
  }

  
/**
 * Take the email attachments and search for a json file
 */
export function dataFromAttachment(
  parsedMail: ParsedMail,
): any {
  const attachments = parsedMail.attachments || [];

  const jsonAttachment = attachments.find(
    (attachment) => attachment.contentType === 'application/json',
  );

  if (jsonAttachment) {
    return JSON.parse(jsonAttachment.content.toString());
  }

  // Si no se encuentra un adjunto con JSON, retornar null o lanzar un error según lo prefieras
  return null;
}
