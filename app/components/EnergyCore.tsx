'use client';
import { useEffect, useRef, useState } from 'react';
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float;
uniform vec2 resolution; uniform float time; uniform vec2 pointer; uniform float mode;
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
float box(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
vec2 map(vec3 p){
 p.xz=rot(.3+time*.08+pointer.x*.15)*p.xz;
 float d=100.; float material=0.;
 for(int j=0;j<5;j++){
  float k=float(j);vec3 q=p;q.y-=(k-2.)*.49; q.xz=rot(k*.23+sin(time*.18)*.10)*q.xz;
  float a=atan(q.z,q.x); float r=length(q.xz);float oct=cos(mod(a+3.1415926/8.,3.1415926/4.)-3.1415926/8.)*r;
  vec2 rq=abs(vec2(oct-1.12,q.y))-vec2(.19,.09);
  float ring=length(max(rq,0.))+min(max(rq.x,rq.y),0.)-.055;
  if(ring<d){d=ring;material=abs(q.y+.10)<.025?2.:1.;}
  float edge=max(abs(oct-1.12)-.21,abs(q.y+.13)-.014);
  if(edge<d){d=edge;material=2.;}
  vec3 b=q;b.xz=rot(3.1415926/8.)*b.xz;float bolts=100.;
  for(int i=0;i<4;i++){vec3 z=b;z.xz=rot(float(i)*1.5707963)*z.xz;z.x-=1.11;z.y-=.14;bolts=min(bolts,box(z,vec3(.045,.035,.045)));}
  if(bolts<d){d=bolts;material=3.;}
 }
 float core=max(length(p.xz)-.60,abs(p.y)-1.4);
 if(core<d){d=core;material=4.;}
 float inner=max(abs(length(p.xz)-.62)-.015,abs(p.y)-1.27);
 if(inner<d){d=inner;material=2.;}
 return vec2(d,material);
}
vec3 normal(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
 vec3 ro=vec3(4.5+pointer.x*.3,3.0+pointer.y*.4,5.5);vec3 target=vec3(0.,0.,0.);
 vec3 ww=normalize(target-ro);vec3 uu=normalize(cross(ww,vec3(0.,1.,0.)));vec3 vv=cross(uu,ww);
 vec3 rd=normalize(uv.x*uu+uv.y*vv+1.65*ww);
 float t=0.;vec2 hit=vec2(0.);bool found=false;
 for(int i=0;i<88;i++){hit=map(ro+rd*t);if(hit.x<.002){found=true;break;}t+=hit.x*.8;if(t>14.)break;}
 vec3 bg=vec3(.038,.043,.040); vec3 color=bg;
 if(found){vec3 p=ro+rd*t;vec3 n=normal(p);vec3 v=-rd;
  vec3 l=normalize(vec3(-3.,6.,5.));vec3 l2=normalize(vec3(4.,2.,-3.));
  float diff=max(dot(n,l),0.);float diff2=max(dot(n,l2),0.);float fres=pow(1.-max(dot(n,v),0.),3.);
  float spec=pow(max(dot(n,normalize(l+v)),0.),55.);float spec2=pow(max(dot(n,normalize(l2+v)),0.),28.);
  float ao=clamp(map(p+n*.2).x/.2,.25,1.);
  vec3 steel=vec3(.27,.285,.26);color=steel*(.20+diff*.70+diff2*.22)*ao;
  color+=vec3(.78,.86,.75)*spec*.8+vec3(1.,.43,.10)*spec2*.9+fres*vec3(.20,.24,.20);
  float grain=fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);color+=grain*.012;
  if(hit.y>1.5&&hit.y<2.5){color=vec3(1.,.34+.03*mode,.035)*(.8+.25*sin(time+p.y*3.));}
  if(hit.y>2.5&&hit.y<3.5)color=vec3(.5,.52,.45)*(.2+diff)+spec;
  if(hit.y>3.5)color=vec3(.055,.06,.055)*(.3+diff)+vec3(.7,.8,.6)*spec*.3;
  color=mix(color,bg,clamp((t-7.)*.035,0.,.15));
 }
 float glow=exp(-length(uv-vec2(0.,-.03))*5.);color+=vec3(.18,.06,.008)*glow*.14;
 color=pow(color,vec3(.85));gl_FragColor=vec4(color,1.);
}`;
export default function EnergyCore({ mode=0 }: { mode?:number }) {
 const canvas=useRef<HTMLCanvasElement>(null);const modeRef=useRef(mode);const [ready,setReady]=useState(false);const [paused,setPaused]=useState(false);const pausedRef=useRef(false);
 useEffect(()=>{modeRef.current=mode},[mode]);useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>{
  const c=canvas.current;if(!c)return;const gl=c.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true,powerPreference:'low-power'});if(!gl)return;
  const shader=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw Error('Shader unavailable')}return s};
  let program:WebGLProgram;let vs:WebGLShader;let fs:WebGLShader;
  try{vs=shader(gl.VERTEX_SHADER,vertex);fs=shader(gl.FRAGMENT_SHADER,fragment);program=gl.createProgram()!;gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Scene unavailable')}catch{return;}
  gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const pos=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const res=gl.getUniformLocation(program,'resolution'),tm=gl.getUniformLocation(program,'time'),pt=gl.getUniformLocation(program,'pointer'),md=gl.getUniformLocation(program,'mode');
  const media=matchMedia('(prefers-reduced-motion: reduce)');let reduced=media.matches;let visible=true;let frame=0;let previous=0;let time=0;let x=0,y=0;let dirty=true;
  const resize=()=>{const r=c.getBoundingClientRect();const ratio=Math.min(devicePixelRatio,1.2);c.width=Math.max(1,Math.floor(r.width*ratio));c.height=Math.max(1,Math.floor(r.height*ratio));gl.viewport(0,0,c.width,c.height);dirty=true;};const ro=new ResizeObserver(resize);ro.observe(c);resize();
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;dirty=true});io.observe(c);
  const onPointer=(e:PointerEvent)=>{if(e.pointerType!=='mouse'||reduced)return;const r=c.getBoundingClientRect();x=(e.clientX-r.left)/r.width-.5;y=.5-(e.clientY-r.top)/r.height;dirty=true};c.addEventListener('pointermove',onPointer);
  const change=()=>{reduced=media.matches;dirty=true};media.addEventListener('change',change);
  const draw=(now:number)=>{frame=requestAnimationFrame(draw);if(now-previous<40)return;const delta=Math.min((now-previous)/1000,.1);previous=now;if(!visible||document.hidden)return;const animate=!reduced&&!pausedRef.current;if(!animate&&!dirty)return;if(animate)time+=delta;gl.uniform2f(res,c.width,c.height);gl.uniform1f(tm,time);gl.uniform2f(pt,x,y);gl.uniform1f(md,modeRef.current);gl.drawArrays(gl.TRIANGLES,0,6);dirty=false;};frame=requestAnimationFrame(draw);setReady(true);
  return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();media.removeEventListener('change',change);c.removeEventListener('pointermove',onPointer);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
 },[]);
 return <div className="energy-scene"><div className={`core-fallback ${ready?'hidden':''}`} aria-hidden="true">{[0,1,2,3,4].map(n=><i key={n} style={{top:`${20+n*11}%`,transform:`rotate(-25deg) rotateX(58deg) rotateZ(${n*8}deg)`}}/>)}</div><canvas ref={canvas} className={ready?'ready':''} aria-label="Illustrative three-dimensional Energy Core with metal rings and amber light" role="img"/><span className="scene-coordinate">VE—CORE / 01</span><span className="scene-caption">CONNECTED BY DESIGN</span><button type="button" className="motion-control" onClick={()=>setPaused(!paused)} aria-label={paused?'Play scene animation':'Pause scene animation'}>{paused?'▶':'Ⅱ'} <span>{paused?'Play motion':'Pause motion'}</span></button></div>;
}
