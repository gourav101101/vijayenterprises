import { Arrow } from './Icons';

// Illustrative work packages only. Replace with approved case studies and images.
const examples = [
 {service:'solar',label:'Solar installation',title:'From open ground to clean energy.',image:'/images/explore-solar.webp',scope:'Installation coordination, electrical interfaces and completion documentation.',brief:'Site location, installation type, drawings and intended start date.'},
 {service:'power',label:'Power infrastructure',title:'The connections behind your operation.',image:'/images/explore-power.webp',scope:'Equipment installation support, cable routes and handover coordination.',brief:'Equipment list, approved scope, site access and delivery schedule.'},
 {service:'civil',label:'Civil project support',title:'A ready foundation for the next stage.',image:'/images/explore-civil.webp',scope:'Site preparation, equipment bases and civil–electrical interfaces.',brief:'Drawings, quantities, ground conditions and interface responsibilities.'},
];

export default function ProjectShowcase(){return <section className="project-showcase section-pad" aria-labelledby="showcase-title">
 <div className="section-heading"><div><span className="eyebrow">WORK IN FOCUS</span><h2 id="showcase-title">Picture the scope.<br/><em>Plan the next step.</em></h2></div><p>Example work packages to help shape your brief. Images are illustrative; these are not completed Vijay Enterprises projects.</p></div>
 <div className="showcase-grid">{examples.map(item=><article className="showcase-card" key={item.service}>
  <div className="showcase-image media-reveal"><img src={item.image} alt={`Illustrative ${item.label.toLowerCase()} setting`} loading="lazy" width="900" height="675"/><span>Illustrative image</span></div>
  <div className="showcase-copy"><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.scope}</p><details><summary>What to include in your brief <span aria-hidden="true">+</span></summary><p>{item.brief}</p></details><a href={`/contact?service=${item.service}`} className="text-link">Discuss a similar scope <Arrow diagonal/></a></div>
 </article>)}</div>
 </section>}
