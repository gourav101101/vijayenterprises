import { Header, Footer, ProjectCTA } from '../components/Shell';
import { processSteps } from '../lib/data';
export const metadata={title:'Our approach'};
export default function Approach(){return <><Header light/><main id="main"><section className="page-hero"><span className="eyebrow">OUR APPROACH</span><h1>Start with clarity.<br/><em>Move with purpose.</em></h1><p>A proposed delivery framework that keeps the work, the interfaces and the next step in focus.</p></section>{processSteps.map(s=><section className="detail-section" key={s.n}><div><h2 style={{marginTop:20}}>{s.title}</h2></div><p>{s.text} Confirm the deliverables and responsibilities in writing so each team can plan against the same expectations.</p></section>)}<ProjectCTA/></main><Footer/></>}
