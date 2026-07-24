import React from 'react';

export default function Expertise() {
  const expertises = [
    {
      title: "Artificial Intelligence",
      desc: "Architecting autonomous intelligent agents, decision frameworks, and deep reasoning models to automate complex cognitive tasks.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="15"></line>
          <line x1="15" y1="9" x2="9" y2="15"></line>
        </svg>
      ),
      tags: ["Deep Learning", "Reasoning", "Autonomous Agents"]
    },
    {
      title: "Web Development",
      desc: "Building modern responsive web applications using React, Node.js, and custom glassmorphic CSS architectures connected to cloud APIs.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      tags: ["React", "JavaScript", "HTML5/CSS3", "REST APIs"]
    },
    {
      title: "Computer Vision",
      desc: "Developing edge-optimized facial recognition, object detection, and spatial tracking pipelines using OpenCV and YOLO models.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      tags: ["OpenCV", "YOLO", "Facial Verification", "Edge TPU"]
    },
    {
      title: "Machine Learning",
      desc: "Engineering supervised & unsupervised ML regressors, classifiers, clustering algorithms, and hyperparameter pipelines in PyTorch & scikit-learn.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      tags: ["PyTorch", "TensorFlow", "Scikit-Learn", "Neural Nets"]
    },
    {
      title: "IoT",
      desc: "Integrating embedded microcontrollers (Raspberry Pi, ESP32) with sensor feeds, camera streams, and real-time remote cloud databases.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
      ),
      tags: ["Raspberry Pi", "Sensors", "Hardware Verification", "MQTT"]
    },
    {
      title: "Research",
      desc: "Conducting empirical experiments, literature reviews, model benchmarking, and drafting academic papers on neural vision and AI systems.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      ),
      tags: ["President Univ", "Benchmarking", "Academic Papers", "Analysis"]
    },
    {
      title: "Problem Solving",
      desc: "Deconstructing complex computational bottlenecks, refining data structures, optimizing algorithmic efficiency, and debugging edge cases.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      tags: ["Algorithms", "Optimization", "Debugging", "Data Structures"]
    },
    {
      title: "Team Collaboration",
      desc: "Leading student organization initiatives, conducting peer code reviews, facilitating agile technical sprints, and communicating complex AI concepts.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      tags: ["Leadership", "Agile", "Peer Review", "Communication"]
    }
  ];

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  };

  const iconBox = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    backgroundColor: 'rgba(140, 29, 54, 0.3)',
    border: '1px solid rgba(224, 169, 109, 0.25)',
    color: '#E0A96D',
    marginBottom: '1.2rem',
    boxShadow: '0 8px 20px rgba(140, 29, 54, 0.25)',
  };

  const titleStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#F9F6F0',
    marginBottom: '0.8rem',
  };

  const descStyle = {
    fontSize: '0.94rem',
    color: '#B3A4A9',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  };

  const tagsContainer = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: 'auto',
  };

  const tagStyle = {
    fontSize: '0.75rem',
    padding: '0.25rem 0.65rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#E0A96D',
    fontWeight: 500,
  };

  return (
    <section id="expertise" className="section" style={sectionStyle}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Core Pillars</span>
          <h2 className="section-title">Fields of Expertise</h2>
        </div>

        <div style={gridStyle}>
          {expertises.map((exp) => (
            <div key={exp.title} className="glass-card" style={cardStyle}>
              <div style={iconBox}>
                {exp.icon}
              </div>
              <h3 style={titleStyle}>{exp.title}</h3>
              <p style={descStyle}>{exp.desc}</p>

              <div style={tagsContainer}>
                {exp.tags.map(t => (
                  <span key={t} style={tagStyle}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
