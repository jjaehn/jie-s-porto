import React from 'react';

export default function Footer({ studentName = "Jihan Azaria Bibi" }) {
  const footerStyle = {
    padding: '3.5rem 0',
    borderTop: '1px solid rgba(224, 169, 109, 0.15)',
    backgroundColor: '#070305',
    position: 'relative',
    zIndex: 2,
    marginTop: '4rem',
  };

  const wrapper = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem',
  };

  const copyText = {
    fontSize: '0.9rem',
    color: '#B3A4A9',
  };

  const designText = {
    fontSize: '0.88rem',
    color: '#E0A96D',
    fontFamily: "'Outfit', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    letterSpacing: '0.05em',
    fontWeight: 600,
  };

  const pulseIndicator = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#D4AF37',
    boxShadow: '0 0 10px #D4AF37',
    display: 'inline-block',
    animation: 'glow-pulse 2s infinite',
  };

  const adminLink = {
    fontSize: '0.82rem',
    color: '#7A696F',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <footer style={footerStyle}>
      <div className="container" style={wrapper}>
        <div style={copyText}>
          © {new Date().getFullYear()} <strong>{studentName}</strong> • President University Informatics AI Laboratory.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a 
            href="#/admin" 
            style={adminLink} 
            onMouseEnter={(e) => e.target.style.color = '#E0A96D'} 
            onMouseLeave={(e) => e.target.style.color = '#7A696F'}
          >
            Admin Portal
          </a>
          <div style={designText}>
            <span style={pulseIndicator} />
            Artificial Intelligence &amp; Cyberpunk Design System
          </div>
        </div>
      </div>
    </footer>
  );
}
