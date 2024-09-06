import { MONTHS } from '../enum/months.enum';
import { ReceiptDto } from '../../data-parser/dto/ses-sns-event.req.dto';

//validation for values parameters
export function checkDnsVerdict(receipt: ReceiptDto): boolean {
  return (
    receipt?.spfVerdict?.status === 'PASS' &&
    receipt?.dkimVerdict?.status === 'PASS' &&
    receipt?.dmarcVerdict?.status === 'PASS'
  );
}
export function extractRecipient(email: string): string {
  return email.split('@')[0];
}

export function getMonthFromTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const monthNames = MONTHS;
  return monthNames[date.getMonth()];
}

export function extractSender(source: string): string {
  return source?.split('@')[0];
}

