import { Header, Footer, ProjectCTA } from '../components/Shell';
import DeliveryProcess from '../components/DeliveryProcess';
export const metadata={title:'Our approach'};
export default function Approach(){return <><Header light/><main id="main"><section className="page-hero"><span className="eyebrow">OUR APPROACH</span><h1>Start with clarity.<br/><em>Move with purpose.</em></h1><p>A proposed delivery framework that keeps the work, the interfaces and the next step in focus.</p></section><section className="section-pad"><DeliveryProcess/></section><ProjectCTA/></main><Footer/></>}
