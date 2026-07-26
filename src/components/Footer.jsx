import React from 'react';

export default function Footer({ studentName = "Jihan Azaria Bibi" }) {
  const footerStyle = {
    padding: '2.5rem 0',
    borderTop: '1px solid rgba(224, 169, 109, 0.15)',
    backgroundColor: '#070305',
    position: 'relative',
    zIndex: 2,
    marginTop: '4rem',
  };

  const wrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const copyText = {
    fontSize: '0.9rem',
    color: '#B3A4A9',
  };

  return (
    <footer style={footerStyle}>
      <div className="container" style={wrapper}>
        <div style={copyText}>
          © {new Date().getFullYear()} <strong>{studentName}</strong> • President University Informatics AI Laboratory.
        </div>
      </div>
    </footer>
  );
}
