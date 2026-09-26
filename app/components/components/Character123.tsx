import {useEffect, useRef, useState} from 'react';

export function Character123({state='idle', label}: {state?: string; label?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAsset, setHasAsset] = useState(false);
  useEffect(() => { fetch('/assets/character-123/character.png', {method: 'HEAD'}).then(r => setHasAsset(r.ok)).catch(() => setHasAsset(false)); }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: PointerEvent) => { const x=(e.clientX/window.innerWidth-.5)*14; const y=(e.clientY/window.innerHeight-.5)*9; el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y}px`); };
    window.addEventListener('pointermove', move, {passive:true}); return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div ref={ref} className={`character character-${state}`} aria-label={label ?? 'Interactive digital presenter'}>
    {hasAsset ? <img className="character-asset" src="/assets/character-123/character.png" alt="" /> : <div className="character-placeholder" aria-hidden="true"><div className="placeholder-aura"/><div className="placeholder-ring"/><div className="placeholder-core"/><div className="placeholder-copy"><b>123</b><small>CHARACTER ASSET SLOT</small></div></div>}
  </div>;
}
