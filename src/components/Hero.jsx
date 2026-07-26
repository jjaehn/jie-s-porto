import React, { useState, useEffect } from 'react';
import InteractivePortrait from './InteractivePortrait';

export default function Hero({ studentName = "Jihan Azaria Bibi" }) {
  const titles = [
    "Informatics Student",
    "Artificial Intelligence Enthusiast"
  ];
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);
  const [manualScanTrigger, setManualScanTrigger] = useState(0);

  // Typewriter effect
  useEffect(() => {
    let timer;
    const fullText = titles[currentTitleIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(70);
      }, typingSpeed);

      if (displayedText === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(35);
      }, typingSpeed);

      if (displayedText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  // Statistics counter
  const [stats, setStats] = useState({
    projects: 0,
    certifications: 0,
    research: 0,
    technologies: 0
  });

  useEffect(() => {
    const duration = 1200;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        projects: Math.min(16, Math.floor((16 / steps) * step)),
        certifications: Math.min(10, Math.floor((10 / steps) * step)),
        research: Math.min(4, Math.floor((4 / steps) * step)),
        technologies: Math.min(17, Math.floor((17 / steps) * step))
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const triggerScan = () => {
    setManualScanTrigger(prev => prev + 1);
  };

  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '7.5rem',
    paddingBottom: '4rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const leftColumn = {
    zIndex: 10,
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    backgroundColor: 'rgba(140, 29, 54, 0.25)',
    border: '1px solid rgba(224, 169, 109, 0.3)',
    color: '#E0A96D',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    marginBottom: '1.2rem',
    textTransform: 'uppercase',
  };

  const dynamicTitle = {
    fontFamily: "'Fira Code', monospace",
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#D4AF37',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minHeight: '1.8rem',
  };

  const introQuote = {
    fontSize: '1.12rem',
    color: '#B3A4A9',
    lineHeight: 1.65,
    borderLeft: '3px solid #8C1D36',
    paddingLeft: '1.4rem',
    marginBottom: '2.5rem',
    maxWidth: '540px',
  };

  const rightColumn = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <section id="hero" style={sectionStyle} className="container hero-section">
      {/* Background Ambient Radial Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(140, 29, 54, 0.22) 0%, rgba(74, 13, 26, 0.08) 55%, transparent 75%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(50px)'
        }}
      />

      <div className="hero-grid">
        <div style={leftColumn}>
          <div style={badgeStyle} className="hero-badge">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E0A96D', boxShadow: '0 0 8px #E0A96D' }} />
            Artificial Intelligence &amp; Full Stack Developer
          </div>

          <h1 className="hero-name">{studentName}</h1>
          
          <div style={dynamicTitle} className="hero-dynamic-title">
            <span style={{ color: '#8C1D36' }}>&gt;</span> {displayedText}
            <span style={{ animation: 'text-blink 0.8s infinite', color: '#E0A96D' }}>|</span>
          </div>

          <p style={introQuote} className="hero-intro-quote">
            "I enjoy building intelligent systems, exploring modern technologies, and creating digital solutions that combine Artificial Intelligence with practical applications."
          </p>

          <div className="hero-button-group">
            <a href="#portfolio" className="btn btn-primary">
              Explore Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#resume" className="btn btn-secondary">
              View Experience
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </a>

          </div>
        </div>

        <div style={rightColumn} className="hero-portrait-col">
          {/* Parallax Ambient Halo */}
          <div style={{
            position: 'absolute',
            width: '440px',
            height: '440px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224, 169, 109, 0.08) 0%, rgba(140, 29, 54, 0.15) 60%, transparent 80%)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          <InteractivePortrait 
            defaultImage="/ai_researcher_portrait.png" 
            manualTriggerScan={manualScanTrigger}
          />
        </div>
      </div>
    </section>
  );
}
