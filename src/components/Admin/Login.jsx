import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPasscode = localStorage.getItem('lab_admin_passcode') || 'laboratory2026';
    if (username === 'admin' && password === storedPasscode) {
      onLoginSuccess();
    } else {
      setError('INVALID AUTHENTICATION PROTOCOL.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#0D0D0D',
    position: 'relative',
    zIndex: 10,
  };

  const cardStyle = {
    maxWidth: '420px',
    width: '100%',
    padding: '3rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    animation: 'loginFade 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    border: '1px solid rgba(122, 31, 61, 0.3)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(122, 31, 61, 0.15)',
  };

  const headerStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #F8F5F2 30%, #7A1F3D 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: '0.3rem',
  };

  const subHeaderStyle = {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    color: '#D4AF37',
    letterSpacing: '0.15em',
    textAlign: 'center',
    marginBottom: '2.5rem',
  };

  const inputGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#F8F5F2',
    letterSpacing: '0.02em',
  };

  const fieldStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(13, 13, 13, 0.7)',
    border: '1px solid rgba(122, 31, 61, 0.25)',
    borderRadius: '8px',
    color: '#F8F5F2',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const errorStyle = {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    color: '#7A1F3D',
    letterSpacing: '0.05em',
    textAlign: 'center',
    marginTop: '1rem',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes loginFade {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div className="glass-card" style={cardStyle}>
        <h2 style={headerStyle}>Laboratory Entry</h2>
        <div style={subHeaderStyle}>SECURE GATEWAY ACCESS</div>

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <label htmlFor="admin-username" style={labelStyle}>User Identity</label>
            <input
              type="text"
              id="admin-username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., admin"
              style={fieldStyle}
              onFocus={(e) => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(122, 31, 61, 0.25)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={inputGroup}>
            <label htmlFor="admin-password" style={labelStyle}>Access Code</label>
            <input
              type="password"
              id="admin-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={fieldStyle}
              onFocus={(e) => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(122, 31, 61, 0.25)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
          >
            Authenticate Node
          </button>

          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
          >
            Cancel Entry
          </button>

          {error && <div style={errorStyle}>{error}</div>}
        </form>
        
        <div style={{
          marginTop: '2rem',
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          HINT: username is 'admin', passcode is 'laboratory2026'
        </div>
      </div>
    </div>
  );
}
