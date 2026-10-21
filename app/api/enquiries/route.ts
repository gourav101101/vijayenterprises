import { getDb } from '../../../db';
import { enquiries,rateLimits } from '../../../db/schema';
import { enquirySchema } from '../../lib/validation';
import { validOrigin } from '../../lib/admin';
import { sql,lt } from 'drizzle-orm';
export async function POST(request:Request){
 if(!validOrigin(request))return Response.json({error:'This request must come from the website.'},{status:403});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return Response.json({error:'Unsupported request format.'},{status:415});
 if(Number(request.headers.get('content-length')||0)>16000)return Response.json({error:'The enquiry is too long.'},{status:413});
 try{
  const raw=await request.text();if(raw.length>16000)return Response.json({error:'The enquiry is too long.'},{status:413});
  let input;try{input=JSON.parse(raw)}catch{return Response.json({error:'Invalid request.'},{status:400})}
  const parsed=enquirySchema.safeParse(input);if(!parsed.success)return Response.json({error:parsed.error.issues[0]?.message||'Please check the form.'},{status:400});
  const db=getDb();const now=Date.now();const ip=request.headers.get('cf-connecting-ip')||'local';
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${ip}|${Math.floor(now/3600000)}`));
  const key=Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');
  const rate=await db.insert(rateLimits).values({key,count:1,createdAt:now}).onConflictDoUpdate({target:rateLimits.key,set:{count:sql`${rateLimits.count}+1`},setWhere:sql`${rateLimits.count}<5`}).returning();
  if(!rate.length)return Response.json({error:'You’ve reached the demo limit of five enquiries per hour. Please try again later.'},{status:429,headers:{'Retry-After':'3600'}});
  const {consent,website,...data}=parsed.data;const id=`VE-${crypto.randomUUID()}`;
  await db.insert(enquiries).values({...data,id,createdAt:now});
  try {
   await db.delete(rateLimits).where(lt(rateLimits.createdAt,now-7200000));
   await db.delete(enquiries).where(lt(enquiries.createdAt,now-90*86400000));
  } catch { console.warn('Demo record cleanup deferred until next submission.'); }
  return Response.json({id,message:'Your demo enquiry has been saved. No email or WhatsApp message has been sent.'},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch(error){console.error('Enquiry storage failed',error instanceof Error?error.message:'unknown');return Response.json({error:'We couldn’t save the enquiry. Please try again shortly. Nothing has been emailed.'},{status:503})}
}
