import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const socialLinks = [
    { 
      name: 'Email', 
      value: 'jihan.azaria@student.president.ac.id', 
      href: 'mailto:jihan.azaria@student.president.ac.id', 
      icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' 
    },
    { 
      name: 'Location', 
      value: 'President University, Cikarang, Indonesia', 
      href: 'https://maps.google.com/?q=President+University', 
      icon: 'M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' 
    },
    { 
      name: 'LinkedIn', 
      value: 'linkedin.com/in/jihan-azaria-bibi', 
      href: 'https://linkedin.com', 
      icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' 
    },
    { 
      name: 'GitHub', 
      value: 'github.com/jihanazariabibi', 
      href: 'https://github.com', 
      icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' 
    },
    { 
      name: 'Instagram', 
      value: '@jihanazaria', 
      href: 'https://instagram.com', 
      icon: 'M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all required fields.');
      return;
    }

    setStatus('INITIALIZING NEURAL TRANSMISSION...');

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('lab_contact_messages') || '[]');
      const newMessage = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      
      localStorage.setItem('lab_contact_messages', JSON.stringify([newMessage, ...existing]));

      setStatus('SIGNAL TRANSMITTED SUCCESSFULLY TO JIHAN AZARIA BIBI.');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus(''), 4000);
    }, 1200);
  };

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.1fr',
    gap: '3.5rem',
    alignItems: 'start',
  };

  const infoGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.2rem',
  };

  const infoItem = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '1.2rem 1.5rem',
    background: 'rgba(22, 7, 12, 0.5)',
    border: '1px solid rgba(224, 169, 109, 0.15)',
    borderRadius: '16px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    background: 'rgba(140, 29, 54, 0.3)',
    border: '1px solid rgba(224, 169, 109, 0.25)',
    color: '#E0A96D',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  };

  const textGroup = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const itemLabel = {
    fontSize: '0.75rem',
    color: '#7A696F',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.2rem',
    fontWeight: 600,
  };

  const itemValue = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.98rem',
    fontWeight: 600,
    color: '#F9F6F0',
    wordBreak: 'break-word',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  };

  const inputGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  };

  const labelStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#F9F6F0',
    letterSpacing: '0.02em',
  };

  const fieldStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(7, 3, 5, 0.75)',
    border: '1px solid rgba(224, 169, 109, 0.2)',
    borderRadius: '12px',
    color: '#F9F6F0',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const statusStyle = {
    fontFamily: "'Fira Code', monospace",
    fontSize: '0.85rem',
    color: '#D4AF37',
    letterSpacing: '0.08em',
    marginTop: '1rem',
    textAlign: 'center',
  };

  return (
    <section id="contact" className="section" style={sectionStyle}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Communications Node</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div style={gridStyle} className="contact-grid">
          {/* Social Links (Left) */}
          <div style={infoGrid}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={infoItem}
                className="contact-info-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(224, 169, 109, 0.45)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(140, 29, 54, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(224, 169, 109, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={iconStyle}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={link.icon} />
                  </svg>
                </div>
                <div style={textGroup}>
                  <span style={itemLabel}>{link.name}</span>
                  <span style={itemValue}>{link.value}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Form (Right) */}
          <div className="glass-card">
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-row">
                <div style={inputGroup}>
                  <label htmlFor="name" style={labelStyle}>Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={fieldStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#E0A96D'; e.target.style.boxShadow = '0 0 12px rgba(224, 169, 109, 0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(224, 169, 109, 0.2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <div style={inputGroup}>
                  <label htmlFor="email" style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={fieldStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#E0A96D'; e.target.style.boxShadow = '0 0 12px rgba(224, 169, 109, 0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(224, 169, 109, 0.2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div style={inputGroup}>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={fieldStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#E0A96D'; e.target.style.boxShadow = '0 0 12px rgba(224, 169, 109, 0.2)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(224, 169, 109, 0.2)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={inputGroup}>
                <label htmlFor="message" style={labelStyle}>Message *</label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...fieldStyle, resize: 'vertical' }}
                  onFocus={(e) => { e.target.style.borderColor = '#E0A96D'; e.target.style.boxShadow = '0 0 12px rgba(224, 169, 109, 0.2)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(224, 169, 109, 0.2)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                Transmit Message
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>

              {status && <div style={statusStyle}>{status}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
