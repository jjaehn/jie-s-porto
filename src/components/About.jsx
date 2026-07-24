import React from 'react';

export default function About() {
  const highlights = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      title: "President University Student",
      desc: "Currently pursuing B.S. in Informatics with a dedicated specialization in Artificial Intelligence, mastering foundational algorithms and deep learning models."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: "AI & Web Development",
      desc: "Combines modern web architectures with state-of-the-art machine learning models, constructing responsive digital applications powered by backend intelligence."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4l3 3"></path>
        </svg>
      ),
      title: "Continuous Learning",
      desc: "Enjoys exploring emerging technologies, solving complex real-world problems, and constantly honing technical skills through projects, research, and organizational activities."
    }
  ];

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const gridStyle = {
    display: 'grid',
    gap: '3.5rem',
    alignItems: 'stretch',
  };

  const bioCard = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  };

  const bioHeader = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#F9F6F0',
    marginBottom: '1.2rem',
    lineHeight: 1.2,
  };

  const bioText = {
    fontSize: '1.05rem',
    color: '#B3A4A9',
    lineHeight: 1.7,
    marginBottom: '1.8rem',
  };

  const chipContainer = {
    display: 'flex',
    gap: '0.8rem',
    flexWrap: 'wrap',
    marginTop: 'auto',
  };

  const chip = {
    fontSize: '0.82rem',
    fontWeight: 600,
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    backgroundColor: 'rgba(140, 29, 54, 0.25)',
    border: '1px solid rgba(224, 169, 109, 0.25)',
    color: '#E0A96D',
    letterSpacing: '0.04em',
  };

  const highlightStack = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const itemCard = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.2rem',
  };

  const iconWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '14px',
    backgroundColor: 'rgba(140, 29, 54, 0.3)',
    border: '1px solid rgba(224, 169, 109, 0.25)',
    color: '#E0A96D',
    flexShrink: 0,
  };

  const itemTitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#F9F6F0',
    marginBottom: '0.4rem',
  };

  const itemDesc = {
    fontSize: '0.94rem',
    color: '#B3A4A9',
    lineHeight: 1.55,
  };

  return (
    <section id="about" className="section" style={sectionStyle}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Biography & Focus</span>
          <h2 className="section-title">About Jihan Azaria Bibi</h2>
        </div>

        <div style={gridStyle} className="about-grid">
          {/* Bio Overview Card */}
          <div className="glass-card" style={bioCard}>
            <div>
              <h3 style={bioHeader}>
                Passionate Informatics Student specializing in Artificial Intelligence & Web Development.
              </h3>
              
              <p style={bioText}>
                I am an Informatics student at <strong>President University</strong> with a strong passion for Artificial Intelligence and Web Development. I thrive on learning emerging technologies, tackling real-world challenges, and continuously advancing my technical expertise through hands-on projects, research papers, and active organizational leadership.
              </p>

              <p style={{ ...bioText, marginBottom: '2rem' }}>
                My objective is to bridge computational intelligence with user-centric software design—building intelligent systems, computer vision tools, and modern web applications that deliver practical value and impactful real-world solutions.
              </p>
            </div>

            <div style={chipContainer}>
              <span style={chip}>President University</span>
              <span style={chip}>Informatics</span>
              <span style={chip}>Artificial Intelligence</span>
              <span style={chip}>Web Development</span>
              <span style={chip}>Computer Vision</span>
              <span style={chip}>Problem Solving</span>
            </div>
          </div>

          {/* Highlight Cards */}
          <div style={highlightStack}>
            {highlights.map((item, idx) => (
              <div key={idx} className="glass-card" style={itemCard}>
                <div style={iconWrapper}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={itemTitle}>{item.title}</h4>
                  <p style={itemDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
