import React, { useState, useEffect } from 'react';

export default function Navbar({ currentPath, setPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section intersection detection for active highlight
      const sections = ['hero', 'about', 'skills', 'expertise', 'portfolio', 'resume', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileOpen]);

  const navLinks = [
    { id: 'hero', name: 'Home', href: '#hero' },
    { id: 'about', name: 'About', href: '#about' },
    { id: 'skills', name: 'Skills', href: '#skills' },
    { id: 'expertise', name: 'Expertise', href: '#expertise' },
    { id: 'portfolio', name: 'Portfolio', href: '#portfolio' },
    { id: 'resume', name: 'Resume', href: '#resume' },
    { id: 'contact', name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, targetId) => {
    setMobileOpen(false);
    if (currentPath === '/admin') {
      setPath('/');
      window.history.pushState(null, '', '#/');
      return;
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navStyle = {
    position: 'fixed',
    top: scrolled ? '0.8rem' : '1.2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '92%',
    maxWidth: '1150px',
    height: '4.2rem',
    borderRadius: '20px',
    backgroundColor: scrolled ? 'rgba(12, 4, 7, 0.88)' : 'rgba(22, 7, 12, 0.65)',
    border: scrolled ? '1px solid rgba(224, 169, 109, 0.3)' : '1px solid rgba(224, 169, 109, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem',
    zIndex: 1000,
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: scrolled ? '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(114, 18, 38, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
  };

  const logoStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 800,
    fontSize: '1.25rem',
    letterSpacing: '0.12em',
    background: 'linear-gradient(135deg, #F9F6F0 20%, #E0A96D 70%, #D4AF37 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none'
  };

  const linkStyle = (isActive) => ({
    textDecoration: 'none',
    color: isActive ? '#F9F6F0' : '#B3A4A9',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.92rem',
    fontWeight: isActive ? 600 : 500,
    letterSpacing: '0.04em',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '0.4rem 0.2rem',
    textShadow: isActive ? '0 0 12px rgba(224, 169, 109, 0.6)' : 'none',
  });

  const logoDotStyle = {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#8C1D36',
    boxShadow: '0 0 10px #8C1D36, 0 0 18px #E0A96D',
    display: 'inline-block',
  };

  return (
    <>
      <nav style={navStyle} className="main-nav-bar">
        <a 
          href="#hero" 
          style={logoStyle} 
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <span style={logoDotStyle} />
          JIE
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-menu-desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id && currentPath !== '/admin';
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={linkStyle(isActive)}
                  className="nav-link-item"
                >
                  {link.name}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #8C1D36, #E0A96D)',
                      boxShadow: '0 0 8px #E0A96D'
                    }} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E0A96D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E0A96D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer Navigation Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span style={logoStyle}>
                <span style={logoDotStyle} /> JIE
              </span>
              <button 
                className="mobile-nav-close" 
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E0A96D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <ul className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id && currentPath !== '/admin';
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
