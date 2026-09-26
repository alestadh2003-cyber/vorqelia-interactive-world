import {Link} from 'react-router';
import {ScrollExperience} from './ScrollExperience';
import {ProductLab} from './ProductLab';

export function Hero(){return <>
 <section className="hero"><div className="hero-grid"/><div className="hero-copy"><p className="eyebrow">THE AUTONOMOUS COMMERCE WORLD</p><h1>Commerce that<br/><em>moves.</em></h1><p className="hero-lede">Products, services and AI experiences inside one living digital world.</p><div className="hero-actions"><Link className="button button-primary" to="/collections/all">Enter Shop</Link><a className="button button-ghost" href="#discover">Explore the world ↓</a></div></div><div className="hero-orbit"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbital-label">INTERACTIVE<br/>COMMERCE</div></div><ScrollExperience/></section>
 <section id="discover" className="manifesto"><p className="eyebrow">NOT A TEMPLATE</p><h2>A storefront should feel like a place, not a grid.</h2><p>VORQELIA is built as a React experience: motion, spatial interaction and commerce logic share the same system.</p></section>
 <section className="split-section"><div><p className="eyebrow">PRODUCT LAB</p><h2>Touch the product.</h2><p>Select a product and the experience can transition from commerce UI into an interactive 3D presentation.</p></div><ProductLab/></section>
 <section id="services" className="service-world"><p className="eyebrow">SERVICES</p><div className="service-grid"><article><span>01</span><h3>Social Growth</h3><p>Strategy, content systems, analytics and compliant social operations.</p></article><article><span>02</span><h3>Creative</h3><p>Product visuals, campaigns and e-commerce creative built for conversion.</p></article><article id="ai"><span>03</span><h3>AI</h3><p>Automation, AI services and subscription experiences designed around real workflows.</p></article></div></section>
 <section id="about" className="final-cta"><p className="eyebrow">VORQELIA / 2026</p><h2>Heavy experience.<br/><em>Light engine.</em></h2><Link className="button button-primary" to="/collections/all">Open the store</Link></section>
 </>}
