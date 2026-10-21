import { chromium } from '@playwright/test';
import fs from 'node:fs';
const base='http://127.0.0.1:5173';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const page=await browser.newPage();
 await Promise.all([page.waitForResponse(r=>r.url().endsWith('/api/admin')&&r.request().method()==='GET'),page.goto(base+'/signin-with-chatgpt?return_to=/admin')]);
 await page.getByRole('heading',{name:'Website content'}).waitFor();
 const original=await page.getByLabel('region',{exact:true}).inputValue();
 await page.getByLabel('region',{exact:true}).fill('Demo region — verification');
 await page.getByRole('button',{name:'Save content'}).click();
 await page.getByText('Content saved. Refresh the website to see the changes.').waitFor();
 const contact=await browser.newPage();
 await contact.goto(base+'/contact');
 const saved=await contact.getByText('Demo region — verification',{exact:true}).isVisible();
 await contact.close();
 if(!saved)throw Error('CMS content did not appear on the contact page.');
 await page.getByLabel('region',{exact:true}).fill(original);
 await Promise.all([page.waitForResponse(r=>r.url().endsWith('/api/admin')&&r.request().method()==='PUT'),page.getByRole('button',{name:'Save content'}).click()]);
 const inbox=await page.request.get(base+'/api/admin');
 const leads=(await inbox.json()).enquiries;
 const testLead=leads.find(l=>l.name==='Demo Reviewer'&&l.email==='demo@example.com');
 if(!testLead)throw Error('Form submission did not persist in the database.');
 const deleted=await page.request.delete(base+'/api/admin?id='+testLead.id,{headers:{Origin:base}});
 if(deleted.status()!==200)throw Error('Administrator deletion failed.');
 const after=await page.request.get(base+'/api/admin');
 if((await after.json()).enquiries.some(l=>l.id===testLead.id))throw Error('Deleted record is still present.');
 const payload={name:'Demo Rate Test',company:'Example Infrastructure',phone:'+91 9000000000',email:'',service:'power',location:'Demo City',message:'Automated demo rate-limit verification.',type:'project',stage:'',start:'',source:'test',consent:true,website:''};
 const statuses=[];
 for(let i=0;i<6;i++){const r=await page.request.post(base+'/api/enquiries',{headers:{Origin:base},data:payload});statuses.push(r.status());}
 if(!statuses.includes(429))throw Error('Rate limit did not activate.');
 const report={cmsSaveAndRead:saved,inboxPersisted:true,deleteVerified:true,rateLimitStatuses:statuses};
 fs.writeFileSync('outputs/admin-verification.json',JSON.stringify(report,null,2));console.log(report);
}finally{await browser.close()}
