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

  return (
    <footer style={footerStyle}>
      <div className="container" style={wrapper}>
        <div style={copyText}>
          © {new Date().getFullYear()} <strong>{studentName}</strong> • President University Informatics AI Laboratory.
        </div>
        <div style={designText}>
          <span style={pulseIndicator} />
          Artificial Intelligence & Cyberpunk Design System
        </div>
      </div>
    </footer>
  );
}
