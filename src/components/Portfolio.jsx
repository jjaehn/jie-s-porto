import React, { useState } from 'react';

export default function Portfolio({ onCaseStudySelect }) {

  const defaultProjects = [
    {
      id: "smart-safe",
      title: "Smart Safe Facial Lockbox",
      category: "Computer Vision",
      tech: ["Python", "OpenCV", "YOLOv8", "Raspberry Pi"],
      desc: "An intelligent security safe integrating biometric facial verification and real time anomaly object detection.",
      span: "span 8",
      github: "https://github.com",
      demo: "https://demo.com",
      caseStudy: "Designed a multimodal hardware security box. Achieved 99.2% face verification accuracy under dim lighting with low edge latency.",
      previewType: "safe",
      status: "published"
    },
    {
      id: "currency-detection",
      title: "Real Time Currency Classifier",
      category: "Machine Learning",
      tech: ["PyTorch", "MobileNetV3", "CoreML", "Python"],
      desc: "On device mobile vision pipeline classifying currencies in real time for visually impaired laboratory assistants.",
      span: "span 4",
      github: "https://github.com",
      demo: "https://demo.com",
      caseStudy: "Quantized MobileNet model weights to 8MB. Integrated real time audio voice prompts for instant currency recognition.",
      previewType: "currency",
      status: "published"
    },
    {
      id: "face-emotion",
      title: "Facial Emotion Recognition",
      category: "Computer Vision",
      tech: ["Python", "OpenCV", "TensorFlow", "Keras"],
      desc: "Analyzes video streams to classify 7 emotion states, tracking engagement metrics in user testing laboratory experiments.",
      span: "span 4",
      github: "https://github.com",
      demo: "https://demo.com",
      caseStudy: "Trained CNN on FER2013 with 468 landmark mesh points. Streamed real time emotion telemetry via WebSocket.",
      previewType: "emotion",
      status: "published"
    },
    {
      id: "pm-system",
      title: "AI Driven PM System",
      category: "Web Applications",
      tech: ["React", "Firebase", "Node.js", "MySQL"],
      desc: "Project management system predicting task bottlenecks and suggesting timeline changes based on historic developer speed.",
      span: "span 4",
      github: "https://github.com",
      demo: "https://demo.com",
      caseStudy: "Built a random forest estimator serving JSON predictions to a glassmorphic React dashboard connected to Firebase.",
      previewType: "pm",
      status: "published"
    },
    {
      id: "ai-chatbot",
      title: "Neural Lab Assistant (RAG)",
      category: "AI Projects",
      tech: ["Python", "LangChain", "LLaMA 3", "ChromaDB"],
      desc: "Retrieval Augmented Chatbot parsing laboratory documentation files and serving immediate configuration procedures.",
      span: "span 4",
      github: "https://github.com",
      demo: "https://demo.com",
      caseStudy: "Ingested 400 pages of lab user guides into Chroma vector database. Used LangChain to resolve queries locally.",
      previewType: "chatbot",
      status: "published"
    }
  ];

  const [projects] = useState(() => {
    const saved = localStorage.getItem('lab_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(p => p.status !== 'draft');
      } catch (e) {
        console.error(e);
      }
    }
    return defaultProjects;
  });

  const filteredProjects = projects;

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '1.5rem',
  };

  const cardStyle = (span) => ({
    gridColumn: span,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '430px',
  });

  const previewContainer = {
    height: '190px',
    backgroundColor: '#090306',
    borderBottom: '1px solid rgba(224, 169, 109, 0.12)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const infoContainer = {
    padding: '1.6rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  };

  const projCategory = {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#E0A96D',
    letterSpacing: '0.08em',
    marginBottom: '0.4rem',
  };

  const projTitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.35rem',
    fontWeight: 700,
    color: '#F9F6F0',
    marginBottom: '0.5rem',
  };

  const projDesc = {
    fontSize: '0.9rem',
    color: '#B3A4A9',
    lineHeight: 1.55,
    marginBottom: '1.2rem',
  };

  const techContainer = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
    marginTop: 'auto',
  };

  const techBadge = {
    fontSize: '0.75rem',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(140, 29, 54, 0.2)',
    border: '1px solid rgba(224, 169, 109, 0.15)',
    color: '#E0A96D',
  };

  const btnContainer = {
    display: 'flex',
    gap: '0.8rem',
  };

  const actionLink = {
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    color: '#F9F6F0',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 0.9rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(224, 169, 109, 0.15)',
    transition: 'all 0.3s ease',
  };

  const renderPreviewGraphic = (type) => {
    if (type === 'safe') {
      return (
        <div className="portfolio-preview safe-preview">
          <div className="safe-ring">
            <div className="safe-dial" />
            <div className="safe-laser" />
          </div>
          <div className="safe-status">SECURE VERIFIED</div>
        </div>
      );
    } else if (type === 'currency') {
      return (
        <div className="portfolio-preview currency-preview">
          <div className="scan-line" />
          <div className="banknote">
            <div className="banknote-details" />
          </div>
        </div>
      );
    } else if (type === 'emotion') {
      return (
        <div className="portfolio-preview emotion-preview">
          <div className="face-mesh">
            <div className="eye-point left" />
            <div className="eye-point right" />
            <div className="mouth-arc" />
          </div>
          <div className="emotion-bar">FOCUS: 96%</div>
        </div>
      );
    } else if (type === 'pm') {
      return (
        <div className="portfolio-preview pm-preview">
          <div className="gantt-chart">
            <div className="gantt-bar bar-a" />
            <div className="gantt-bar bar-b" />
          </div>
        </div>
      );
    } else if (type === 'chatbot') {
      return (
        <div className="portfolio-preview chatbot-preview">
          <div className="chat-bubble bubble-left">Setting up RAG vector?</div>
          <div className="chat-bubble bubble-right">Loading LLaMA-3...</div>
        </div>
      );
    } else if (type === 'iot') {
      return (
        <div className="portfolio-preview iot-preview">
          <div className="iot-box">
            <span className="iot-pulse" />
            <div className="iot-text">MQTT: 24°C | OK</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="portfolio-preview research-preview">
          <div className="research-paper">
            <div className="paper-line title-line" />
            <div className="paper-line" />
            <div className="paper-line" />
          </div>
        </div>
      );
    }
  };

  return (
    <section id="portfolio" className="section" style={sectionStyle}>
      <style>{`
        .portfolio-preview {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .safe-ring {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 4px solid #4A0D1A;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .safe-dial {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #8C1D36;
          border: 2px solid #E0A96D;
          transition: transform 0.8s ease;
        }
        .safe-laser {
          position: absolute;
          width: 2px;
          height: 45px;
          background-color: #E0A96D;
          transform-origin: bottom center;
          bottom: 45px;
          box-shadow: 0 0 8px #E0A96D;
        }
        .glass-card:hover .safe-dial { transform: rotate(180deg); }
        .safe-status {
          position: absolute;
          bottom: 12px;
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: #E0A96D;
        }

        .banknote {
          width: 130px;
          height: 70px;
          border: 1px solid rgba(224, 169, 109, 0.3);
          background: rgba(140, 29, 54, 0.15);
          border-radius: 6px;
          position: relative;
        }
        .banknote-details {
          width: 30px;
          height: 30px;
          border: 1px solid rgba(224, 169, 109, 0.25);
          border-radius: 50%;
          position: absolute;
          top: 20px;
          left: 50px;
        }
        .scan-line {
          position: absolute;
          width: 150px;
          height: 2px;
          background-color: #E0A96D;
          box-shadow: 0 0 10px #E0A96D;
          z-index: 5;
          animation: scan 3s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-40px); }
          50% { transform: translateY(40px); }
          100% { transform: translateY(-40px); }
        }

        .face-mesh {
          width: 90px;
          height: 90px;
          border: 1px dashed rgba(224, 169, 109, 0.3);
          border-radius: 50%;
          position: relative;
        }
        .eye-point {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #E0A96D;
          position: absolute;
          top: 30px;
          box-shadow: 0 0 6px #E0A96D;
        }
        .left { left: 24px; }
        .right { right: 24px; }
        .mouth-arc {
          width: 40px;
          height: 20px;
          border: 2px solid #E0A96D;
          border-style: none none solid none;
          border-radius: 50%;
          position: absolute;
          bottom: 22px;
          left: 25px;
          transition: border-radius 0.5s ease;
        }
        .glass-card:hover .mouth-arc { border-radius: 0; }
        .emotion-bar {
          position: absolute;
          bottom: 12px;
          font-family: monospace;
          font-size: 0.7rem;
          color: #E0A96D;
        }

        .gantt-chart {
          width: 140px;
          height: 60px;
          border-left: 2px solid rgba(255, 255, 255, 0.1);
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }
        .gantt-bar {
          position: absolute;
          height: 12px;
          border-radius: 3px;
          transition: width 0.8s ease;
        }
        .bar-a { width: 60px; left: 10px; top: 10px; background-color: #8C1D36; }
        .bar-b { width: 80px; left: 40px; top: 30px; background-color: #E0A96D; }
        .glass-card:hover .bar-a { width: 90px; }
        .glass-card:hover .bar-b { width: 100px; }

        .chat-bubble {
          position: absolute;
          font-family: monospace;
          font-size: 0.65rem;
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          max-width: 150px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.5s ease;
        }
        .bubble-left {
          background-color: rgba(22, 7, 12, 0.85);
          left: 20px;
          top: 35px;
          color: #B3A4A9;
        }
        .bubble-right {
          background-color: rgba(140, 29, 54, 0.35);
          border-color: rgba(224, 169, 109, 0.25);
          right: 20px;
          top: 95px;
          color: #F9F6F0;
        }
        .glass-card:hover .bubble-left { transform: translateY(-5px); }
        .glass-card:hover .bubble-right { transform: translateY(-5px); }

        .iot-box {
          padding: 0.8rem 1.5rem;
          background: rgba(42, 8, 16, 0.7);
          border: 1px solid rgba(224, 169, 109, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .iot-pulse {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #E0A96D;
          box-shadow: 0 0 10px #E0A96D;
          animation: pulse-glow 2s infinite;
        }
        .iot-text {
          font-family: monospace;
          font-size: 0.8rem;
          color: #F9F6F0;
        }

        .research-paper {
          width: 120px;
          height: 110px;
          background: rgba(22, 7, 12, 0.8);
          border: 1px solid rgba(224, 169, 109, 0.25);
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flexDirection: column;
          gap: 0.6rem;
        }
        .paper-line {
          height: 4px;
          border-radius: 2px;
          background: rgba(224, 169, 109, 0.3);
        }
        .title-line {
          width: 80%;
          background: #E0A96D;
        }

        @media (max-width: 900px) {
          .bento-grid > div {
            grid-column: span 12 !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '3rem' }}>
          <span className="section-subtitle">Showcase Repositories</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div style={gridStyle} className="bento-grid">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id} 
              className="glass-card" 
              style={cardStyle(proj.span || "span 6")}
            >
              {/* Interactive cover */}
              <div style={{ ...previewContainer, height: proj.image ? '240px' : '190px', padding: proj.image ? '0.5rem' : 0 }}>
                {proj.image ? (
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain', 
                      objectPosition: 'center',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(12, 4, 8, 0.9)'
                    }} 
                  />
                ) : (
                  renderPreviewGraphic(proj.previewType)
                )}
              </div>

              {/* Info */}
              <div style={infoContainer}>
                <div style={projCategory}>{proj.category}</div>
                <h3 style={projTitle}>{proj.title}</h3>
                <p style={projDesc}>{proj.desc}</p>
                
                {/* Tech tags */}
                <div style={techContainer}>
                  {proj.tech.map(t => (
                    <span key={t} style={techBadge}>{t}</span>
                  ))}
                </div>

                {/* Actions (Only render buttons if URL / Case Study is present) */}
                <div style={btnContainer}>
                  {proj.github && proj.github.trim() !== '' && (
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={actionLink}
                    >
                      GitHub
                    </a>
                  )}
                  {proj.demo && proj.demo.trim() !== '' && (
                    <a 
                      href={proj.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={actionLink}
                    >
                      Live Demo
                    </a>
                  )}
                  {((proj.caseStudy && proj.caseStudy.trim() !== '') || (proj.fullDesc && proj.fullDesc.trim() !== '')) && (
                    <button 
                      onClick={() => onCaseStudySelect(proj)}
                      style={{ ...actionLink, cursor: 'pointer', backgroundColor: 'rgba(140, 29, 54, 0.3)' }}
                    >
                      Case Study
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
