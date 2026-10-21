import { z } from 'zod';
export const enquirySchema=z.object({
 name:z.string().trim().min(2,'Please enter your full name.').max(100),
 company:z.string().trim().min(2,'Please enter your company.').max(150),
 phone:z.string().trim().regex(/^\+?[\d\s()-]{7,24}$/,'Please enter a valid phone number with country code.').refine(s=>s.replace(/\D/g,'').length>=7&&s.replace(/\D/g,'').length<=15,'Please enter 7–15 digits.'),
 email:z.union([z.literal(''),z.string().trim().email('Please check your email address.').max(150)]),
 service:z.enum(['power','telecom','solar','civil','other']),
 location:z.string().trim().min(2,'Please enter the project city or state.').max(150),
 message:z.string().trim().min(10,'Please add at least 10 characters about your project.').max(4000),
 type:z.enum(['project','vendor','callback']),
 stage:z.enum(['','planning','tender','awarded','execution','maintenance']).default(''),
 start:z.string().max(30).default(''),source:z.string().max(300).default('direct'),
 consent:z.literal(true),website:z.string().max(0),
});
export const contentSchema=z.object({
 heroTitle:z.string().trim().min(5).max(80),heroDescription:z.string().trim().min(10).max(300),
 aboutTitle:z.string().trim().min(5).max(100),aboutBody:z.string().trim().min(20).max(1200),
 email:z.string().email().max(150),phone:z.string().max(30),whatsapp:z.string().regex(/^\d{7,15}$|^$/),region:z.string().max(200),
});
