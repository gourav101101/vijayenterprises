export default function ServiceDiagram({service}:{service:string}){
 const steel='#28694F',amber='#EC5E27',line='#A5CCA0',blue='#064734';
 return <svg className="service-diagram" viewBox="0 0 600 430" role="img" aria-label={`Illustrative ${service} infrastructure diagram`}>
  <defs><pattern id={`grid-${service}`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#D2E7C7" strokeWidth=".7"/></pattern><linearGradient id={`ground-${service}`} x2="0" y2="1"><stop stopColor="#EDFFD9"/><stop offset="1" stopColor="#D2F2B4"/></linearGradient></defs>
  <rect width="600" height="430" fill={`url(#grid-${service})`}/>
  <ellipse cx="300" cy="350" rx="210" ry="48" fill="#78B56B" opacity=".16"/>
  <g className="diagram-ground"><path d="m80 300 240-98 205 104-240 100Z" fill={`url(#ground-${service})`} stroke={line}/><path d="m80 300 205 106v14L80 314Zm205 106 240-100v14L285 420Z" fill="#B5D998" stroke={line}/></g>
  {service==='power'&&<g fill="none" stroke={steel} strokeLinecap="round" strokeLinejoin="round">
   <path d="m220 334 66-268 65 268M254 201h65M238 268h96M268 135h35M220 334l114-66-80-67 49-66-17-69M351 334l-113-66 81-67-51-66" strokeWidth="5"/>
   <path d="M201 139h170l-85-42ZM177 202h218l-109-51Z" strokeWidth="5" fill="#FDFDF1"/>
   <path d="M207 140v26m158-26v26M186 203v30m201-30v30" stroke={amber} strokeWidth="10"/>
   <path className="diagram-energy" d="M65 208q55 15 121 25m201 0q62 15 158-24M70 151q68 35 137 15m158 0q100 27 170-15" stroke={amber} strokeWidth="2"/>
   <path d="m210 333 16-7 15 8-16 8Zm126 1 17-8 16 8-17 8Z" fill="#fff" strokeWidth="2"/>
   <path d="m387 306 39-17 33 17v45l-39 17-33-17Z" fill="#FDFDF1" strokeWidth="2"/><path d="m387 306 33 17 39-17m-39 17v45" strokeWidth="2"/><path d="m397 295 22 12 27-12" stroke={amber} strokeWidth="6"/>
  </g>}
  {service==='telecom'&&<g fill="none" stroke={steel} strokeWidth="4" strokeLinejoin="round">
   <path d="m246 337 53-267 53 267M267 231h65m-55-55h43M246 337l86-106-55-55 22-106m53 267-85-106 53-55-21-106"/>
   <path d="M299 60V29" stroke={amber}/><rect x="246" y="92" width="22" height="67" rx="6" fill="#fff"/><rect x="330" y="92" width="22" height="67" rx="6" fill="#fff"/><path d="M268 120h62"/>
   <ellipse cx="320" cy="210" rx="24" ry="30" fill="#FDFDF1"/><path d="m299 210 29 6 16-14" stroke={amber}/>
   <g className="diagram-signal" stroke={amber} strokeWidth="2"><path d="M224 94q-20 30 0 61m-23-83q-40 52 0 106M373 94q20 30 0 61m23-83q40 52 0 106"/></g>
   <path d="m360 282 55-24 49 25v66l-55 24-49-25Z" fill="#fff" strokeWidth="2"/><path d="m360 282 49 25 55-24m-55 24v66" strokeWidth="2"/><path d="m356 281 59-27 54 28-60 27Z" fill="#EC5E27" strokeWidth="2"/>
  </g>}
  {service==='solar'&&<g strokeLinejoin="round">
   {[0,1,2].map(row=>[0,1,2].map(col=><g key={`${row}-${col}`} className="diagram-panel" style={{animationDelay:`${(row*3+col)*45}ms`}} transform={`translate(${128+col*96+row*31},${199+row*44-col*26})`}>
    <path d="M10 39v27m57-31v20" stroke={steel} strokeWidth="4"/>
    <path d="m0 4 63-23 27 43-63 24Z" fill={blue} stroke="#FDFDF1" strokeWidth="4"/>
    <path d="m21-4 27 44m-6-52 27 44M9 19l63-23M18 33 63 9" fill="none" stroke="#90CDA5" strokeWidth="1"/>
   </g>))}
   <circle cx="420" cy="83" r="26" fill="#EC5E27"/><g stroke={amber} strokeWidth="2">{[0,45,90,135].map(a=><path key={a} d="M420 39v-9m0 106v-9" transform={`rotate(${a} 420 83)`}/>)}</g>
   <path className="diagram-energy" d="M155 345q110 25 215-27l65-10" fill="none" stroke={amber} strokeWidth="3"/>
  </g>}
  {service==='civil'&&<g stroke={steel} strokeWidth="2" strokeLinejoin="round">
   <path d="m183 270 124-51 117 57-124 55Z" fill="#B5D998"/>
   {[0,1,2].map(level=><g key={level} className="diagram-panel" style={{animationDelay:`${level*100}ms`}}>
    <path d={`M196 ${272-level*57}v-53M302 ${322-level*57}v-53M410 ${274-level*57}v-53M304 ${220-level*57}v-53`} fill="none" strokeWidth="7"/>
    <path d={`m183 ${219-level*57} 124-51 117 57-124 55Z`} fill="#FDFDF1"/>
   </g>)}
   <path d="M446 303V77m18 226V77M446 110l18 28-18 28 18 28-18 28 18 28-18 28" stroke={amber} strokeWidth="5" fill="none"/>
   <path d="M337 80h160l-43-36Z" fill="#FF9A62" stroke={amber} strokeWidth="3"/><path d="M350 80v109" fill="none"/><rect x="342" y="190" width="16" height="10" fill={amber}/>
  </g>}
  <path d="M70 373h85m-42-6v12M455 373h80m-40-6v12" stroke={line} fill="none"/>
 </svg>;
}
