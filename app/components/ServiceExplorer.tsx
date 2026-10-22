'use client';
import {useRef,useState} from 'react';
import {services} from '../lib/data';
import {Arrow,ServiceIcon} from './Icons';
import ServiceDiagram from './ServiceDiagram';

export default function ServiceExplorer(){
 const [active,setActive]=useState(0),[photo,setPhoto]=useState(false);const tabs=useRef<(HTMLButtonElement|null)[]>([]);const service=services[active];
 function navigate(event:React.KeyboardEvent,index:number){let next=index;if(event.key==='ArrowRight')next=(index+1)%4;else if(event.key==='ArrowLeft')next=(index+3)%4;else if(event.key==='Home')next=0;else if(event.key==='End')next=3;else return;event.preventDefault();setActive(next);tabs.current[next]?.focus()}
 return <div className="service-explorer">
  <div className="explorer-tabs" role="tablist" aria-label="Explore services">{services.map((s,i)=><button key={s.id} ref={el=>{tabs.current[i]=el}} role="tab" id={`explore-tab-${s.id}`} aria-controls={`explore-panel-${s.id}`} aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>navigate(e,i)}><ServiceIcon type={s.icon} size={23}/><span>{s.short}</span><Arrow diagonal/></button>)}</div>
  {services.map((s,i)=><div key={s.id} role="tabpanel" id={`explore-panel-${s.id}`} aria-labelledby={`explore-tab-${s.id}`} hidden={active!==i} tabIndex={0} className="explorer-panel">
   {active===i&&<><div className="explorer-visual"><div className="explorer-view" aria-label="Visual style"><button aria-pressed={!photo} onClick={()=>setPhoto(false)}>Illustration</button><button aria-pressed={photo} onClick={()=>setPhoto(true)}>Photography</button></div><div className="explorer-art" key={s.id+(photo?'photo':'diagram')}>{photo?<img src={`/images/explore-${s.id}.webp`} width="900" height="680" alt={`Contextual ${s.label.toLowerCase()} photography`}/>:<ServiceDiagram service={s.id}/>}</div><span className="explorer-visual-note">{photo?'Contextual photography':'Illustrative infrastructure'}</span></div>
   <div className="explorer-detail" key={s.id}><span className="eyebrow">{s.eyebrow}</span><h3>{s.label}</h3><p>{s.description}</p><ul>{s.scope.slice(0,3).map(item=><li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><div className="explorer-actions"><a href={`/contact?service=${s.id}`} className="button primary">Discuss your {s.short.toLowerCase()} project<Arrow diagonal/></a><a href={`/services/${s.id}`} className="text-link">View full scope<Arrow/></a></div></div></>}
  </div>)}
  <div className="explorer-inputs"><span>Start with the right information.</span><p>{service.inputs.join(' · ')}</p></div>
  <noscript><p>Explore the full service pages:</p><div className="explorer-nojs">{services.map(s=><a key={s.id} href={`/services/${s.id}`}>{s.label} ↗</a>)}</div></noscript>
 </div>;
}
