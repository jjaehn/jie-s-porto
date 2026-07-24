import React, { useState, useEffect } from 'react';

export default function Navbar({ currentPath, setPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
    top: scrolled ? '1rem' : '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '92%',
    maxWidth: '1150px',
    height: '4.2rem',
    borderRadius: '20px',
    backgroundColor: scrolled ? 'rgba(12, 4, 7, 0.85)' : 'rgba(22, 7, 12, 0.55)',
    border: scrolled ? '1px solid rgba(224, 169, 109, 0.3)' : '1px solid rgba(224, 169, 109, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
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

  const menuStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '1.8rem',
    alignItems: 'center',
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
    <nav style={navStyle}>
      <a 
        href="#hero" 
        style={logoStyle} 
        onClick={(e) => handleNavClick(e, 'hero')}
      >
        <span style={logoDotStyle} />
        JIE
      </a>

      <ul style={menuStyle} className="nav-menu">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id && currentPath !== '/admin';
          return (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                style={linkStyle(isActive)}
                className="nav-link-item"
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.color = '#F9F6F0';
                    e.target.style.textShadow = '0 0 10px rgba(224, 169, 109, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.color = '#B3A4A9';
                    e.target.style.textShadow = 'none';
                  }
                }}
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
    </nav>
  );
}
