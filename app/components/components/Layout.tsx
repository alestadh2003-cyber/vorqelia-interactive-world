import {Link} from 'react-router';
import {useState} from 'react';

export function Layout({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header">
      <Link to="/" className="wordmark">VORQELIA<span>®</span></Link>
      <nav className={open ? 'nav nav-open' : 'nav'}>
        <Link to="/">World</Link><Link to="/collections/all">Shop</Link><Link to="/#services">Services</Link><Link to="/#ai">AI</Link><Link to="/#about">About</Link>
      </nav>
      <div className="header-actions"><Link to="/collections/all" className="text-action">Explore</Link><button aria-label="Open menu" className="menu-button" onClick={()=>setOpen(v=>!v)}>☰</button></div>
    </header>
    {children}
    <footer className="site-footer"><span>VORQELIA</span><span>Commerce / Creative / AI</span><span>© 2026</span></footer>
  </>;
}
