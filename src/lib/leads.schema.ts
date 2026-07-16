import { z } from "zod";

export const SERVICE_INTERESTS = [
  "AI Solutions",
  "AI Agency Services",
  "AI Trainings",
  "Content & Growth",
  "Web Development",
  "Mobile App Development",
  "Desktop Applications",
  "Software Development",
  "Cloud & Reliability",
  "Not sure yet",
] as const;

export const leadInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email").max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  socialLink: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
  serviceInterest: z.string().trim().max(100).optional().or(z.literal("")),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadInputSchema>;
