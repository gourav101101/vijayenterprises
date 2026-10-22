import { Header, Footer, ProjectCTA } from '../components/Shell';
import { Arrow, ServiceIcon } from '../components/Icons';
import ServiceExplorer from '../components/ServiceExplorer';
export const metadata={title:'Our expertise'};
export default function Services(){return <><Header light/><main id="main"><section className="page-hero"><div className="eyebrow">OUR EXPERTISE</div><h1>Connected expertise.<br/><em>On common ground.</em></h1><p>Four disciplines, brought together around the needs of your project. Explore the possibilities and start with a clear scope.</p></section><section className="section-pad"><ServiceExplorer/><p className="note-box">This is a concept preview. Service descriptions illustrate the proposed offering. Exact capabilities, regions and work-package inclusions will be confirmed before commercial launch.</p></section><ProjectCTA/></main><Footer/></>}
