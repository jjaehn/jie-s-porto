import React from 'react';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(13, 13, 13, 0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '2rem',
  };

  const modalContainer = {
    maxWidth: '650px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    animation: 'modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const closeButton = {
    position: 'absolute',
    top: '1.2rem',
    right: '1.2rem',
    background: 'none',
    color: '#A09E9B',
    cursor: 'pointer',
    padding: '0.4rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  };

  const headingStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.8rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #F8F5F2 30%, #D4AF37 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.2rem',
  };

  const metaGroup = {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.8rem',
    color: '#E0A899',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600,
    marginBottom: '1.5rem',
  };

  const subHeading = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#F8F5F2',
    marginBottom: '0.6rem',
    marginTop: '1.5rem',
    letterSpacing: '0.02em',
  };

  const textStyle = {
    fontSize: '0.95rem',
    color: '#A09E9B',
    lineHeight: 1.6,
  };

  const techBadge = {
    fontSize: '0.8rem',
    padding: '0.3rem 0.7rem',
    borderRadius: '4px',
    backgroundColor: 'rgba(122, 31, 61, 0.15)',
    border: '1px solid rgba(224, 168, 153, 0.15)',
    color: '#E0A899',
  };

  return (
    <div style={overlayStyle} onClick={onClose} className="modal-overlay">
      <style>{`
        @keyframes modalSlideIn {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div 
        style={modalContainer} 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={closeButton}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#F8F5F2'; e.currentTarget.style.backgroundColor = 'rgba(122, 31, 61, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#A09E9B'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#D4AF37', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>
          PROJECT ANALYSIS CASE STUDY
        </span>
        <h2 style={headingStyle}>{project.title}</h2>
        <div style={metaGroup}>
          <span>{project.category}</span>
          <span>•</span>
          <span>Secure Archive Node</span>
        </div>

        <h3 style={subHeading}>Laboratory Objectives</h3>
        <p style={textStyle}>{project.desc}</p>

        <h3 style={subHeading}>Implementation & Outcomes</h3>
        <p style={textStyle}>{project.caseStudy}</p>

        <h3 style={subHeading}>Technology Blueprint</h3>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {project.tech.map((t) => (
            <span key={t} style={techBadge}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.9rem' }}
          >
            Access Repository
          </a>
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-secondary"
            style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.9rem' }}
          >
            Execute Terminal Demo
          </a>
        </div>
      </div>
    </div>
  );
}
