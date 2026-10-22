'use client';
import { useEffect,useRef,useState } from 'react';
import { Arrow,ServiceIcon } from './Icons';
import { services } from '../lib/data';
const prompts:Record<string,string>={power:'Installation type, equipment, drawings available and the support you need.',telecom:'Number of sites, regions, site power scope and rollout timeline.',solar:'Rooftop or ground-mounted, approximate capacity, site readiness and installation scope.',civil:'Type of civil work, approximate quantities, drawings and site conditions.',other:'The services involved, project scale and the support you need.'};
export default function ContactForm(){
 const [type,setType]=useState('project'),[service,setService]=useState(''),[location,setLocation]=useState(''),[step,setStep]=useState(0),[busy,setBusy]=useState(false),[error,setError]=useState(''),[success,setSuccess]=useState('');
 const first=useRef<HTMLFieldSetElement>(null),heading=useRef<HTMLHeadingElement>(null);const selected=services.find(s=>s.id===service);
 useEffect(()=>{const p=new URLSearchParams(window.location.search);const t=p.get('type');if(t==='vendor'||t==='callback')setType(t);const s=p.get('service');if(services.some(x=>x.id===s))setService(s!)},[]);
 function go(next:number){setStep(next);setError('');requestAnimationFrame(()=>heading.current?.focus())}
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(busy)return;const form=e.currentTarget;
  if(step===0){for(const el of Array.from(first.current?.querySelectorAll('input,select')||[])){if(!(el as HTMLInputElement).reportValidity())return}go(1);return}
  if(!form.reportValidity())return;setBusy(true);setError('');const fields=Object.fromEntries(new FormData(form));const params=new URLSearchParams(window.location.search);const source=['utm_source','utm_medium','utm_campaign'].map(k=>params.get(k)).filter(Boolean).join(' / ').slice(0,300)||'direct';
  try{const res=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,type,service,source,consent:fields.consent==='on'})});const result=await res.json() as {id:string;error?:string};if(!res.ok)throw Error(result.error||'Please try again.');setSuccess(result.id);form.reset()}catch(e){setError(e instanceof Error?e.message:'Unable to save. Please try again.')}finally{setBusy(false)}
 }
 if(success)return <div className="form-success" role="status"><span className="eyebrow">DEMO ENQUIRY SAVED</span><h2>A conversation<br/>worth starting.</h2><p>Your demo enquiry is saved for review. No email or WhatsApp notification has been sent. This preview is not monitored by a sales team.</p><code>Reference: {success}</code><button className="button" onClick={()=>{setSuccess('');setStep(0);setLocation('')}}>Start another enquiry <Arrow/></button></div>;
 return <form className="contact-form guided-form" onSubmit={submit} noValidate>
  <div className="form-mode" aria-label="Enquiry type">{[['project','Project enquiry'],['vendor','Vendor / partnership'],['callback','Call back']].map(([v,l])=><button key={v} type="button" className={type===v?'selected':''} aria-pressed={type===v} onClick={()=>setType(v)}>{l}</button>)}</div>
  <div className="enquiry-progress" aria-label="Enquiry progress"><button type="button" aria-current={step===0?'step':undefined} onClick={()=>go(0)}>Your project</button><span aria-hidden="true"/><span aria-current={step===1?'step':undefined}>Your details</span></div>
  <h2 className="enquiry-heading" tabIndex={-1} ref={heading}>{step===0?'What are you planning?':type==='callback'?'How can we reach you?':'Let’s make the introduction.'}</h2>
  <p className="enquiry-intro">{step===0?'Start with the essentials. We’ll shape the next step around your project.':'Add your contact details and a short brief.'}</p>
  {error&&<div className="form-error" role="alert">{error}</div>}
  <fieldset ref={first} hidden={step!==0} className="enquiry-fields"><legend className="sr-only">Project details</legend><div className="form-grid">
   <label className="field full"><span>Service interest *</span><select value={service} onChange={e=>setService(e.target.value)} required name="service"><option value="" disabled>Select a discipline</option>{services.map(s=><option value={s.id} key={s.id}>{s.label}</option>)}<option value="other">Other / multiple services</option></select></label>
   <label className="field full"><span>Project location *</span><input name="location" required minLength={2} maxLength={150} value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, state"/></label>
   <label className="field"><span>Project stage</span><select name="stage"><option value="">Select stage (optional)</option><option value="planning">Planning</option><option value="tender">Tender / RFQ</option><option value="awarded">Awarded</option><option value="execution">Active execution</option><option value="maintenance">Maintenance</option></select></label>
   <label className="field"><span>Expected start</span><input name="start" type="month"/></label>
  </div>{selected&&<aside className="enquiry-context"><ServiceIcon type={selected.icon}/><div><strong>A useful starting point for {selected.short.toLowerCase()}.</strong><p>{selected.inputs[0]}. {selected.inputs[1]}.</p></div></aside>}</fieldset>
  <fieldset hidden={step!==1} className="enquiry-fields"><legend className="sr-only">Your contact details</legend><div className="enquiry-summary"><span>{selected?.label||'Multiple services'} · {location}</span><button type="button" onClick={()=>go(0)}>Edit project</button></div><div className="form-grid">
   <label className="field"><span>Full name *</span><input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name"/></label>
   <label className="field"><span>Company / organisation *</span><input name="company" required minLength={2} maxLength={150} autoComplete="organization" placeholder="Company name"/></label>
   <label className="field"><span>Business phone *</span><input name="phone" type="tel" required maxLength={24} autoComplete="tel" placeholder="Include country code"/></label>
   <label className="field"><span>Business email</span><input name="email" type="email" maxLength={150} autoComplete="email" placeholder="you@company.com"/></label>
   <label className="field full"><span>{type==='callback'?'What would you like to discuss?':'Tell us about the work'} *</span><textarea name="message" required minLength={10} maxLength={4000} aria-describedby="brief-hint" placeholder={type==='vendor'?'Your services, operating regions and partnership requirements.':prompts[service]||'A short overview of your project.'}/></label>
  </div><p id="brief-hint" className="brief-hint">{type==='callback'?'Include a suitable time to call and the topic you want to discuss.':type==='vendor'?'Tell us where your team works and the kind of partnership you have in mind.':prompts[service]||prompts.other}</p>
  <label className="consent"><input type="checkbox" name="consent" required/><span>I understand this is a demo and agree to storage as explained in the <a href="/privacy">privacy notice</a>. Please use sample information only.</span></label></fieldset>
  <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
  <div className="enquiry-actions">{step===1&&<button type="button" className="enquiry-back" onClick={()=>go(0)}>← Back</button>}<button className="button primary form-submit" disabled={busy}>{step===0?'Continue to contact details':busy?'Saving your demo enquiry…':'Save demo enquiry'}<Arrow diagonal/></button></div>
  <p className="demo-notice">Demo mode · Saved for review only. No sales notification is sent.</p>
 </form>;
}
