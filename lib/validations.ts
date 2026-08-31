import { z } from 'zod';
import { isFloridaZip } from './florida-zips';

/**
 * Format raw numbers into standard US Phone format (XXX) XXX-XXXX
 */
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

/**
 * Validates whether a phone number is a valid 10-digit US number and not a test/fake pattern
 */
export function isValidUSPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return false;

  // Disallow invalid area codes starting with 0 or 1
  if (digits[0] === '0' || digits[0] === '1') return false;

  // Disallow common fake / test numbers
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

  // Disallow 555-0100 through 555-0199 (fictional television numbers)
  if (digits.slice(3, 8) === '55501') return false;

  return true;
}

/**
 * Parses a single "Full Name" string into firstName and lastName
 */
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

/**
 * Detect common email typos (e.g. gmai.com -> gmail.com)
 */
export function suggestEmailDomainCorrection(email: string): string | null {
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return null;

  const [localPart, domain] = parts;
  const commonTypos: Record<string, string> = {
    'gmai.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'yaho.co': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmaill.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com',
    'iclud.com': 'icloud.com',
    'icoud.com': 'icloud.com',
    'comcats.net': 'comcast.net',
    'comcat.net': 'comcast.net',
  };

  if (commonTypos[domain]) {
    return `${localPart}@${commonTypos[domain]}`;
  }
  return null;
}

/**
 * Server-side Zod validation schema for lead creation
 */
export const leadSubmissionSchema = z.object({
  zipCode: z
    .string()
    .min(5, 'Zip code must be 5 digits')
    .refine((val) => isFloridaZip(val), {
      message: 'Must be a valid Florida zip code (32004 - 34997)',
    }),
  city: z.string().min(2, 'City is required'),
  state: z.string().default('FL'),
  serviceType: z.enum(['Replacement', 'Repair', 'Inspection'], {
    errorMap: () => ({ message: 'Please select a valid service type' }),
  }),
  fullName: z
    .string()
    .min(3, 'Please enter your full name')
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Please include both your first and last name',
    }),
  streetAddress: z
    .string()
    .min(5, 'Please enter a valid street address (minimum 5 characters)'),
  isHomeowner: z.boolean().refine((val) => val === true, {
    message: 'You must be the homeowner or authorized decision-maker',
  }),
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
