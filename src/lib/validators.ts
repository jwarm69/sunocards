import { z } from 'zod';
import { Filter } from 'bad-words';

const filter = new Filter();

// Custom refinement for profanity check
const noProfanity = (value: string) => !filter.isProfane(value);

export const recipientNameSchema = z
  .string()
  .min(1, 'Recipient name is required')
  .max(50, 'Name must be 50 characters or less')
  .refine(noProfanity, 'Please use appropriate language');

export const personalityTraitsSchema = z
  .array(z.string().max(30))
  .min(1, 'Add at least one personality trait')
  .max(5, 'Maximum 5 personality traits');

export const interestsSchema = z
  .array(z.string().max(30))
  .min(1, 'Add at least one interest')
  .max(5, 'Maximum 5 interests');

export const relationshipSchema = z
  .string()
  .min(1, 'Relationship is required')
  .max(30, 'Relationship must be 30 characters or less');

export const musicStyleSchema = z.enum([
  'upbeat_pop',
  'acoustic_folk',
  'smooth_jazz',
  'edm',
  'rnb_soul',
  'classic_rock',
  'hip_hop',
  'classical',
]);

export const themeIdSchema = z.enum([
  'classic',
  'modern',
  'playful',
  'elegant',
  'retro',
  'nature',
]);

export const customMessageSchema = z
  .string()
  .max(500, 'Message must be 500 characters or less')
  .refine(noProfanity, 'Please use appropriate language')
  .optional();

export const senderNameSchema = z
  .string()
  .min(1, 'Your name is required')
  .max(50, 'Name must be 50 characters or less')
  .refine(noProfanity, 'Please use appropriate language');

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .optional()
  .or(z.literal(''));

// Complete card creation schema
export const createCardSchema = z.object({
  recipientName: recipientNameSchema,
  personalityTraits: personalityTraitsSchema,
  interests: interestsSchema,
  relationship: relationshipSchema,
  musicStyle: musicStyleSchema,
  themeId: themeIdSchema,
  customMessage: customMessageSchema,
  senderName: senderNameSchema,
  senderEmail: emailSchema,
});

// Email sending schema
export const sendEmailSchema = z.object({
  cardId: z.string().uuid(),
  recipientEmail: z.string().email('Invalid email address'),
});

// Share ID schema (nanoid format)
export const shareIdSchema = z
  .string()
  .length(12, 'Invalid share ID')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid share ID format');

export type CreateCardInput = z.infer<typeof createCardSchema>;
export type SendEmailInput = z.infer<typeof sendEmailSchema>;
