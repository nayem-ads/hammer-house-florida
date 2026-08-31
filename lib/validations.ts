import { z } from 'zod';
import { isFloridaZip } from './florida-zips';

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (!digits) return '';
  if (digits.length <= 3) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function isValidUSPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return false;
  if (digits[0] === '0' || digits[0] === '1') return false;

  const invalidPatterns = [
    '1234567890',
    '0000000000',
    '1111111111',
    '2222222222',
    '3333333333',
    '4444444444',
    '5555555555',
    '6666666666',
    '7777777777',
    '8888888888',
    '9999999999',
    '9876543210',
  ];
  if (invalidPatterns.includes(digits)) return false;
  if (digits.slice(3, 8) === '55501') return false;

  return true;
}

export function parseFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim().replace(/\s+/g, ' ');
  const parts = trimmed.split(' ');

  if (parts.length === 1) {
    return {
      firstName: parts[0] || 'Homeowner',
      lastName: '',
    };
  }

  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  return { firstName, lastName };
}

export const leadSubmissionSchema = z.object({
  zipCode: z
    .string()
    .min(5, 'Zip code must be 5 digits')
    .refine((val) => isFloridaZip(val), {
      message: 'Must be a valid Florida zip code (32004 - 34997)',
    }),
  city: z.string().min(2, 'City is required'),
  state: z.string().default('FL'),
  serviceType: z.string().default('Replacement'),
  roofAge: z.string().optional().default('Not sure'),
  fullName: z.string().min(2, 'Please enter your full name'),
  streetAddress: z.string().min(4, 'Please enter a valid street address'),
  isHomeowner: z.boolean().default(true),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => isValidUSPhone(val), {
      message: 'Please enter a valid 10-digit phone number',
    }),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  tcpaConsent: z.boolean().default(true),
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
