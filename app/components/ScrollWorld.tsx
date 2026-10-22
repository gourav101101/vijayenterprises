'use client';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Icons';
import type { SiteContent } from '../lib/data';
import type { createWorld } from './infrastructure-world';

const chapters=[
 {label:'The vision',title:'Infrastructure.\nIn motion.',text:'Power. Telecom. Solar. Civil.\nA connected world, built from the ground up.',link:'/contact',cta:'Let’s build what’s next',word:'CONNECTED'},
 {label:'Power',title:'Potential.\nPut to work.',text:'Explore the infrastructure behind every connection. Defined electrical work packages, aligned with your site.',link:'/services/power',cta:'Explore power infrastructure',word:'ENERGISED'},
 {label:'Telecom',title:'Every signal.\nStarts here.',text:'Behind a connected world is work on the ground. Site power and installation support for telecom project teams.',link:'/services/telecom',cta:'Explore telecom site power',word:'CONNECTED'},
 {label:'Solar',title:'A brighter idea.\nBuilt to last.',text:'From open ground to new potential. Solar installation and site execution support for your next project.',link:'/services/solar',cta:'Explore solar installation',word:'RENEWED'},
 {label:'Civil',title:'Groundwork.\nFor what comes next.',text:'The first step shapes everything that follows. Civil work packages coordinated around infrastructure delivery.',link:'/services/civil',cta:'Explore civil project support',word:'GROUNDED'},
];

export default function ScrollWorld({content}:{content:SiteContent}){
 const root=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),engine=useRef<ReturnType<typeof createWorld>|null>(null),progress=useRef(0);
 const [active,setActive]=useState(0),[ready,setReady]=useState(false),[reduced,setReduced]=useState(false),[wireframe,setWireframe]=useState(false),[still,setStill]=useState(false),[failed,setFailed]=useState(false);
 const simple=reduced||still||failed;
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{let cancelled=false;import('./infrastructure-world').then(({createWorld})=>{if(cancelled||!canvas.current)return;try{engine.current=createWorld(canvas.current,()=>{setReady(false);setFailed(true)});engine.current.setProgress(progress.current,true);setReady(true)}catch{setReady(false);setFailed(true)}}).catch(()=>{if(!cancelled)setFailed(true)});return()=>{cancelled=true;engine.current?.dispose();engine.current=null}},[]);
 useEffect(()=>{if(simple){engine.current?.setProgress(active/4,true);return}let frame=0;const update=()=>{frame=0;if(!root.current)return;const rect=root.current.getBoundingClientRect();const value=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight)));progress.current=value;setActive(Math.round(value*4));engine.current?.setProgress(value);root.current.style.setProperty('--journey-progress',`${value*100}%`)};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update();return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(frame)}},[simple]);
 function choose(i:number){setActive(i);progress.current=i/4;engine.current?.setProgress(i/4,simple);if(!simple&&root.current){const top=root.current.getBoundingClientRect().top+scrollY;window.scrollTo({top:top+(root.current.offsetHeight-innerHeight)*(i/4),behavior:'smooth'})}}
 const chapter=chapters[active];const title=active===0?content.heroTitle:chapter.title;
 return <section ref={root} className={`scroll-world ${simple?'world-static':''}`} aria-label="Explore our infrastructure world"><noscript><style>{'.scroll-world{height:100svh;min-height:760px}.world-sticky{position:relative;min-height:760px}.world-bottom nav{display:none}'}</style></noscript><div className="world-sticky">
  <div className="world-grid" aria-hidden="true"/><div className="world-watermark" aria-hidden="true">{chapter.word}</div>
  <div className="world-copy" key={chapter.label}><span className="eyebrow"><i/>{active===0?'ENGINEERING A CONNECTED FUTURE':chapter.label.toUpperCase()+' / OUR EXPERTISE'}</span><h1>{title.split('\n').map((l,i)=><span className={i?'world-accent':''} key={l}>{l}</span>)}</h1><p>{active===0?content.heroDescription:chapter.text}</p><a className="button primary" href={chapter.link}>{chapter.cta}<Arrow diagonal/></a><a href="#expertise" className="world-skip">Skip to all services <span>↓</span></a></div>
  <div className={`world-stage ${ready?'world-ready':''}`}><div className="world-halo" aria-hidden="true"/><div className="world-fallback"><img src="/images/hero-solar-640.webp" width="640" height="480" alt="Illustrative solar infrastructure landscape"/><span>Power · Telecom · Solar · Civil</span></div><canvas ref={canvas} role="img" aria-label="Interactive illustrative 3D infrastructure landscape with power and telecom towers, solar panels, a building and crane"/><span className="world-model-caption">A connected world, in miniature.<small>Illustrative design · not a completed project</small></span>
  {ready&&<div className="world-controls"><button aria-pressed={wireframe} onClick={()=>{setWireframe(!wireframe);engine.current?.setWireframe(!wireframe)}}>{wireframe?'Solid view':'Blueprint view'}</button><button aria-pressed={still} onClick={()=>{setStill(!still);requestAnimationFrame(()=>{if(root.current)window.scrollTo({top:root.current.offsetTop,behavior:'instant'})})}}>{still?'Enable scroll motion':'Reduce motion'}</button></div>}</div>
  <div className="world-bottom"><span className="world-scroll-hint">{simple?'SELECT A DISCIPLINE':'SCROLL TO EXPLORE THE WORLD'} <span>↓</span></span><nav aria-label="3D story chapters">{chapters.map((c,i)=><button key={c.label} aria-current={active===i?'step':undefined} onClick={()=>choose(i)}><span/>{c.label}</button>)}</nav><a href="/contact" className="world-contact">Your next project <Arrow diagonal/></a></div>
  <div className="world-progress" aria-hidden="true"/>
 </div></section>;
}
