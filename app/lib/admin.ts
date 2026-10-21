import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../chatgpt-auth';
export async function isAdmin(){
 const email=(env as unknown as {SITE_ADMIN_EMAIL?:string}).SITE_ADMIN_EMAIL?.trim().toLowerCase();
 if(!email)return false;
 const user=await getChatGPTUser();
 return !!user && user.email?.toLowerCase()===email;
}
export function validOrigin(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).origin;}
