import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {Character123} from './Character123';

type Product = {
  id: string; title: string; handle: string;
  featuredImage?: {url: string; altText?: string | null} | null;
  priceRange: {minVariantPrice: {amount: string; currencyCode: string}};
};

const scenes = [
  ['01 / WORLD', 'Commerce should feel alive.', 'A cinematic Shopify storefront where products, services and AI share one responsive world.'],
  ['02 / DISCOVER', 'Move through the experience.', 'Scroll changes the scene while the presenter moves with you instead of sitting inside a static banner.'],
  ['03 / PRESENT', 'Meet the digital presenter.', 'Character 123 is a state-driven interaction slot. The approved character asset can be added without rebuilding the experience.'],
  ['04 / COMMERCE', 'Real Shopify commerce underneath.', 'Catalog data comes from the connected Storefront API; product pages remain the source of truth for commerce.'],
] as const;

export function InteractiveWorld({products}: {products: Product[]}) {
  const [scroll, setScroll] = useState(0);
  const [pointer, setPointer] = useState({x: 50, y: 50});
  const [selected, setSelected] = useState<Product | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    const onPointer = (event: PointerEvent) => setPointer({x: event.clientX / window.innerWidth * 100, y: event.clientY / window.innerHeight * 100});
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('pointermove', onPointer, {passive: true});
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onPointer); };
  }, []);

  const scene = Math.min(scenes.length - 1, Math.floor(scroll * scenes.length));
  const state = ['idle', 'walking', 'looking_product', 'presenting'][scene];

  return <div className="world" style={{'--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%`} as React.CSSProperties}>
    <div className="world-progress"><span style={{width: `${Math.max(4, scroll * 100)}%`}} /></div>

    <section className="world-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">VORQELIA / INTERACTIVE COMMERCE</p>
        <h1>Commerce<br />should feel <em>alive.</em></h1>
        <p className="hero-lede">Products. Services. AI. One responsive world built around real Shopify commerce.</p>
        <div className="hero-actions"><a className="button button-primary" href="#shop">Enter the world</a><a className="button button-ghost" href="#services">Discover services</a></div>
        <div className="hero-meta"><span>SHOPIFY / HYDROGEN</span><span>2026</span><span>HEAVY EXPERIENCE / LIGHT ENGINE</span></div>
      </div>
      <div className="hero-stage">
        <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
        <div className="pointer-orb" aria-hidden="true" />
        <Character123 state={state} label="VORQELIA digital presenter" />
        <div className="character-scene-tag">{scenes[scene][0]}</div>
      </div>
      <div className="scroll-cue"><span /> SCROLL TO MOVE</div>
    </section>

    <section className="story-section" id="discover">
      <div className="story-sticky"><p className="eyebrow">{scenes[scene][0]}</p><h2>{scenes[scene][1]}</h2><p>{scenes[scene][2]}</p><div className="story-meter"><span style={{width: `${Math.max(8, scroll * 100)}%`}} /></div></div>
      <div className="story-rail">{scenes.map((s, i) => <article key={s[0]} className={i === scene ? 'story-card active' : 'story-card'}><span>{s[0]}</span><strong>0{i + 1}</strong></article>)}</div>
    </section>

    <section className="world-section shop-section" id="shop">
      <div className="section-heading"><p className="eyebrow">SHOP / LIVE CATALOG</p><h2>Real products.<br /><em>Not mock cards.</em></h2><p>Products below are read from your Shopify Storefront API.</p></div>
      <div className="world-products">{products.slice(0, 6).map((product, index) => <button className="world-product" key={product.id} onClick={() => {setSelected(product); setRotation(0);}}><div className="product-stage">{product.featuredImage ? <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} /> : <span className="product-empty">V</span>}<span className="product-index">0{index + 1}</span></div><div className="product-copy"><strong>{product.title}</strong><span>{product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</span></div></button>)}</div>
      {!products.length && <div className="empty-world">No products are currently returned by the connected Storefront API.</div>}
    </section>

    <section className="world-section service-world" id="services">
      <div className="section-heading"><p className="eyebrow">SERVICES / OPERATIONS</p><h2>One system.<br /><em>Multiple growth layers.</em></h2></div>
      <div className="service-grid">{[['01','SOCIAL GROWTH','Content systems, publishing workflows, analytics and compliant growth operations.'],['02','CREATIVE','Product visuals, campaigns, e-commerce creative and social content.'],['03','AI','Automation, AI services and subscription experiences built around real workflows.'],['04','E-COMMERCE','Storefront design, catalog operations, conversion systems and optimization.']].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#shop">Explore layer →</a></article>)}</div>
    </section>

    <section className="lab-section" id="ai">
      <div className="lab-copy"><p className="eyebrow">PRODUCT LAB / 3D READY</p><h2>Select.<br />Present.<br /><em>Rotate.</em></h2><p>The interaction layer is prepared for approved 3D product assets. Three.js is isolated to premium interaction zones so the rest of the storefront stays light.</p>{products[0] && <button className="button button-primary" onClick={() => setSelected(products[0])}>Present a live product</button>}</div>
      <div className="lab-stage" style={{transform: `rotateY(${rotation}deg)`}}><div className="lab-object"><div className="lab-cap" /><div className="lab-label">VORQELIA</div></div><div className="lab-shadow" /></div>
      <div className="lab-controls"><button onClick={() => setRotation(rotation - 25)}>←</button><span>DRAG / TOUCH</span><button onClick={() => setRotation(rotation + 25)}>→</button></div>
    </section>

    <section className="closing-section" id="about"><p className="eyebrow">VORQELIA / 2026</p><h2>Not another storefront.<br /><em>A living commerce interface.</em></h2><a className="button button-primary" href="#shop">Enter the catalog</a></section>

    {selected && <div className="product-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button><div className="modal-presenter"><Character123 state="presenting" label="Digital presenter" /><span>PRESENTER / 123</span></div><div className="modal-product"><div className="modal-visual" style={{transform: `rotateY(${rotation}deg)`}}>{selected.featuredImage ? <img src={selected.featuredImage.url} alt={selected.featuredImage.altText || selected.title} /> : <span>V</span>}</div><p className="eyebrow">SELECTED PRODUCT</p><h2>{selected.title}</h2><p className="modal-price">{selected.priceRange.minVariantPrice.amount} {selected.priceRange.minVariantPrice.currencyCode}</p><div className="modal-actions"><button className="button" onClick={() => setRotation(rotation - 25)}>Rotate ←</button><button className="button" onClick={() => setRotation(rotation + 25)}>Rotate →</button><Link className="button button-primary" to={`/products/${selected.handle}`} onClick={() => setSelected(null)}>Open product</Link></div></div></div>}
  </div>;
}
