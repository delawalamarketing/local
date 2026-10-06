import { z } from 'zod'

const utmSchema = z
  .object({
    source: z.string().max(255).optional(),
    medium: z.string().max(255).optional(),
    campaign: z.string().max(255).optional(),
    content: z.string().max(255).optional(),
    term: z.string().max(255).optional(),
  })
  .optional()

/** The email gate in front of the sales video. */
export const vslLeadSchema = z.object({
  email: z.string().email().max(254),
  honeypot: z.string().max(255).optional().default(''),
  utm: utmSchema,
  source: z.string().max(100).optional(),
})

/** The booking form on /apply (step 1, before the calendar). */
export const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().trim().min(7).max(50),
  business_name: z.string().trim().min(1).max(200),
  trade: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  /** Google Business Profile or website link. Optional: many owners don't have it handy. */
  profile_url: z.string().trim().max(2048).optional().or(z.literal('')),
  honeypot: z.string().max(255).optional().default(''),
  utm: utmSchema,
  source: z.string().max(100).optional(),
})

export type VslLeadInput = z.infer<typeof vslLeadSchema>
export type LeadInput = z.infer<typeof leadSchema>
