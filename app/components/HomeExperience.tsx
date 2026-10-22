'use client';
import { useEffect } from 'react';
import ScrollWorld from './ScrollWorld';
import ServiceExplorer from './ServiceExplorer';
import DeliveryProcess from './DeliveryProcess';
import { Header, Footer, ProjectCTA } from './Shell';
import { Arrow, ServiceIcon } from './Icons';
import { services, type SiteContent } from '../lib/data';
export default function HomeExperience({content}:{content:SiteContent}) {
 useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));return()=>observer.disconnect()},[]);
 return <><Header/><main id="main"><ScrollWorld content={content}/>
 <section className="discipline-bar" aria-label="Our disciplines">{services.map(s=><a href={`/services/${s.id}`} key={s.id}><ServiceIcon type={s.icon} size={23}/><span>{s.short}</span><Arrow diagonal/></a>)}</section>
 <section className="intro section-pad"><div className="section-label"><span className="square-dot"/> THE BIGGER PICTURE </div><div className="intro-content reveal"><h2>{content.aboutTitle.split('\n').map(l=><span key={l}>{l}<br/></span>)}</h2><div className="intro-bottom"><p>{content.aboutBody}</p><a href="/about" className="text-link">Meet Vijay Enterprises <Arrow diagonal/></a></div></div></section>
 <section className="expertise section-pad" id="expertise"><div className="section-heading"><div><div className="eyebrow">OUR EXPERTISE</div><h2>Four disciplines.<br/><em>Endless possibility.</em></h2></div><p>From the first foundation to the final connection.<br/>Explore the work that brings infrastructure to life.</p></div><ServiceExplorer/></section>
 <section className="statement"><div className="statement-image"><img src="/images/solar.jpg" alt="An illustrative view of an organised solar installation" loading="lazy"/></div><div className="statement-content"><span className="eyebrow"><i/> A SHARED AMBITION</span><h2>Progress isn’t<br/>built in isolation.</h2><p>It takes the right conversations. Clear responsibilities.<br/>And people working towards the same outcome.</p><a href="/contact?type=vendor" className="button light-button">Build a partnership <Arrow diagonal/></a></div><span className="statement-footnote">CONCEPT PHOTOGRAPHY</span></section>
 <section className="process section-pad" id="process"><DeliveryProcess/></section>
 <section className="perspective section-pad"><div className="section-heading"><div><span className="eyebrow">FIELD NOTES</span><h2>Before the<br/><em>first day on site.</em></h2></div><a href="/projects" className="text-link">Explore perspectives <Arrow diagonal/></a></div><div className="field-notes"><a href="/projects/site-readiness" className="field-note reveal"><img src="/images/civil.jpg" alt="Illustrative construction site" loading="lazy"/><div><span className="eyebrow">PROJECT PLANNING · 3 MIN READ</span><h3>A better start begins with a site that’s ready.</h3><Arrow diagonal/></div></a><a href="/projects/scope-clarity" className="field-note reveal"><img src="/images/power.jpg" alt="Illustrative power infrastructure" loading="lazy"/><div><span className="eyebrow">WORK PACKAGES · 3 MIN READ</span><h3>Clear scope. Fewer questions. Better coordination.</h3><Arrow diagonal/></div></a></div></section><ProjectCTA/></main><Footer/></>;
}
