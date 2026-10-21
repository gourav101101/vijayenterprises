import { isAdmin,validOrigin } from '../../lib/admin';
import { getDb } from '../../../db';
import { enquiries,settings } from '../../../db/schema';
import { desc,eq } from 'drizzle-orm';
import { contentSchema } from '../../lib/validation';
export async function GET(){if(!await isAdmin())return Response.json({error:'Administrator access required.'},{status:403});return Response.json({enquiries:await getDb().select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(200)},{headers:{'Cache-Control':'no-store'}})}
export async function PUT(request:Request){if(!validOrigin(request)||!await isAdmin())return Response.json({error:'Access denied.'},{status:403});try{const raw=await request.text();if(raw.length>10000)return Response.json({error:'Content too long.'},{status:413});const result=contentSchema.safeParse(JSON.parse(raw));if(!result.success)return Response.json({error:result.error.issues[0].message},{status:400});await getDb().insert(settings).values({id:'site',value:JSON.stringify(result.data)}).onConflictDoUpdate({target:settings.id,set:{value:JSON.stringify(result.data)}});return Response.json({ok:true})}catch{return Response.json({error:'Content could not be saved.'},{status:503})}}
export async function DELETE(request:Request){if(!validOrigin(request)||!await isAdmin())return Response.json({error:'Access denied.'},{status:403});const id=new URL(request.url).searchParams.get('id');if(!id||id.length>80)return Response.json({error:'Invalid enquiry.'},{status:400});await getDb().delete(enquiries).where(eq(enquiries.id,id));return Response.json({ok:true})}
