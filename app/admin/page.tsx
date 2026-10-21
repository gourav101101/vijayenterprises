import { Header,Footer } from '../components/Shell';
import { isAdmin } from '../lib/admin';
import { getSiteContent } from '../lib/content';
import AdminPanel from './panel';
export const dynamic='force-dynamic';
export const metadata={title:'Administration'};
export default async function Admin(){const allowed=await isAdmin();return <><Header light/><main id="main" className="admin"><span className="eyebrow">VIJAY ENTERPRISES / ADMINISTRATION</span><h1>Behind the scenes.</h1>{allowed?<AdminPanel initial={await getSiteContent()}/>:<div className="note-box"><h2>Administrator access required.</h2><p>Content editing and the enquiry inbox are protected. The site owner must set the production <code>SITE_ADMIN_EMAIL</code> environment variable to the intended administrator’s ChatGPT sign-in email before this panel can be used. Access is denied by default.</p><p><a className="text-link" href="/signin-with-chatgpt?return_to=/admin" target="_top">Sign in with ChatGPT ↗</a></p></div>}</main><Footer/></>}
