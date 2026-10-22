import { Arrow, ServiceIcon } from './Icons';

export default function InfrastructureHero() {
  return <div className="infrastructure-visual">
    <div className="hero-photo-frame">
      <img className="hero-landscape" src="/images/hero-solar-1100.webp" srcSet="/images/hero-solar-640.webp 640w, /images/hero-solar-1100.webp 1100w" sizes="(max-width:760px) 92vw, 48vw" width="1100" height="825" fetchPriority="high" loading="eager" alt="Solar panels beneath an open sky, illustrating energy infrastructure"/>
      <div className="hero-photo-label"><span className="hero-live-dot"/> A connected future starts here.</div>
    </div>
    <a className="hero-power-inset" href="/services/power">
      <img src="/images/hero-power.webp" width="420" height="520" alt="Illustrative power transmission structure at sunset" decoding="async"/>
      <span>Powering possibility <Arrow diagonal/></span>
    </a>
    <div className="hero-service-panel"><span className="eyebrow">BUILT AROUND YOUR PROJECT</span><p>From the ground up.<br/>Connected at every step.</p><div><a href="/services/solar"><ServiceIcon type="sun" size={20}/> Solar <Arrow diagonal/></a><a href="/services/civil"><ServiceIcon type="layers" size={20}/> Civil <Arrow diagonal/></a></div></div>
    <p className="hero-photo-credit">Illustrative infrastructure photography</p>
  </div>;
}
