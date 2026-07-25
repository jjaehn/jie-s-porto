import React, { useState } from 'react';

export default function Resume() {
  const [activeCategory, setActiveCategory] = useState("education");

  const resumeData = {
    education: [
      {
        date: "2023 - Present",
        title: "B.S. in Informatics (AI Specialization)",
        subtitle: "President University",
        desc: "Specializing in Artificial Intelligence, Neural Networks, Computer Vision, and Web Development. Core coursework: Machine Learning, Deep Learning, Data Structures, Web Systems, Linear Algebra."
      },
      {
        date: "2020 - 2023",
        title: "Senior High School (Science & Mathematics)",
        subtitle: "Science Honors Track",
        desc: "Graduated with highest academic distinction. Focused on Advanced Mathematics, Physics, and introductory Python algorithm design."
      }
    ],
    experience: [
      {
        date: "2025 - Present",
        title: "AI & Web Developer (Research Intern)",
        subtitle: "Artificial Intelligence Laboratory",
        desc: "Engineering Computer Vision object verification pipelines and full-stack React dashboards. Optimized edge inference latency for embedded camera nodes."
      },
      {
        date: "2024 - 2025",
        title: "Software & AI Solutions Freelancer",
        subtitle: "Self-Employed",
        desc: "Built custom web applications and dataset management pipelines for academic research initiatives and small businesses."
      }
    ],
    organization: [
      {
        date: "2024 - Present",
        title: "Active Member & Coordinator",
        subtitle: "PUMA Informatics (President University)",
        desc: "Organizing tech workshops, AI seminars, programming hackathons, and community peer coding sessions for Informatics students."
      },
      {
        date: "2024 - Present",
        title: "Core Member",
        subtitle: "AI Student Collective",
        desc: "Leading weekly paper review circles focusing on Large Language Models, Computer Vision architectures, and ethical AI development."
      }
    ],
    projects: [
      {
        date: "2025 - 2026",
        title: "Smart Safe Biometric Lockbox",
        subtitle: "Hardware & Vision System",
        desc: "Built an intelligent safe combining facial recognition verification with real-time anomaly detection running on Raspberry Pi."
      },
      {
        date: "2025",
        title: "Real-Time Currency Classifier",
        subtitle: "Mobile ML Pipeline",
        desc: "Developed an on-device MobileNet vision classifier providing instant auditory feedback for visually impaired assistants."
      },
      {
        date: "2025",
        title: "Neural RAG Lab Assistant",
        subtitle: "NLP & LLM System",
        desc: "Constructed a Retrieval-Augmented Generation chatbot parsing technical documentation files with ChromaDB vector search."
      }
    ],
    certification: [
      {
        date: "2025",
        title: "TensorFlow Developer Certificate",
        subtitle: "Google",
        desc: "Validated expertise in building, training, and deploying deep neural network models for computer vision and NLP."
      },
      {
        date: "2025",
        title: "Deep Learning Specialization",
        subtitle: "DeepLearning.AI",
        desc: "Mastered multi-layer neural architectures, hyperparameter tuning, CNNs, and Sequence Models."
      },
      {
        date: "2024",
        title: "OpenCV Computer Vision Masterclass",
        subtitle: "OpenCV Association",
        desc: "Certified in image processing, matrix transformations, spatial feature extraction, and real-time video streaming."
      }
    ],
    achievement: [
      {
        date: "2025 - 2026",
        title: "President University Academic Honor List",
        subtitle: "President University",
        desc: "Awarded Dean's Honor Distinction for maintaining top GPA in the Faculty of Computer Science & Informatics."
      },
      {
        date: "2025",
        title: "1st Place - National Vision & AI Hackathon",
        subtitle: "National Tech Alliance",
        desc: "Won 1st place for designing an on-device assistive currency identification model running under 48 hours."
      },
      {
        date: "2024",
        title: "Finalist - University Tech Innovation Award",
        subtitle: "President University AI Showcase",
        desc: "Selected as top finalist for presenting an AI-driven smart safety and monitoring prototype."
      }
    ]
  };

  const categories = [
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "organization", label: "Organizations" },
    { id: "projects", label: "Projects" },
    { id: "certification", label: "Certifications" },
    { id: "achievement", label: "Achievements" }
  ];

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const layoutGrid = {
    display: 'grid',
    gap: '3.5rem',
    alignItems: 'start',
  };

  const tabList = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const tabItem = (isActive) => ({
    padding: '1.2rem 1.5rem',
    borderRadius: '16px',
    background: isActive ? 'rgba(140, 29, 54, 0.35)' : 'rgba(22, 7, 12, 0.45)',
    border: isActive ? '1px solid rgba(224, 169, 109, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: isActive ? '0 10px 25px rgba(140, 29, 54, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none',
  });

  const tabLabel = (isActive) => ({
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 600,
    color: isActive ? '#F9F6F0' : '#B3A4A9',
    letterSpacing: '0.02em',
  });

  const timelineContainer = {
    position: 'relative',
    paddingLeft: '2.5rem',
    borderLeft: '2px solid rgba(140, 29, 54, 0.3)',
  };

  const timelineItem = {
    position: 'relative',
    marginBottom: '2.5rem',
  };

  const timelineDot = {
    position: 'absolute',
    left: '-3.15rem',
    top: '0.3rem',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#070305',
    border: '3px solid #E0A96D',
    boxShadow: '0 0 10px #E0A96D',
    zIndex: 2,
  };

  const timelineDate = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#E0A96D',
    letterSpacing: '0.08em',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
  };

  const timelineTitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#F9F6F0',
    marginBottom: '0.3rem',
  };

  const timelineSubtitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1rem',
    color: '#D4AF37',
    fontWeight: 600,
    marginBottom: '0.8rem',
  };

  const timelineDesc = {
    fontSize: '0.94rem',
    color: '#B3A4A9',
    lineHeight: 1.6,
  };

  return (
    <section id="resume" className="section" style={sectionStyle}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Academic & Professional Career</span>
          <h2 className="section-title">Experience</h2>
        </div>

        <div style={layoutGrid} className="resume-grid">
          {/* Categories list (Left) */}
          <div style={tabList} className="resume-tabs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={tabItem(isActive)}
                  className="resume-tab-btn"
                >
                  <span style={tabLabel(isActive)}>{cat.label}</span>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={isActive ? '#E0A96D' : '#B3A4A9'} 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Timeline Items (Right) */}
          <div style={{ position: 'relative' }}>
            <div style={timelineContainer} className="resume-timeline-container">
              {resumeData[activeCategory].map((item, idx) => (
                <div key={idx} style={timelineItem} className="resume-timeline-item">
                  <div style={timelineDot} />
                  <div style={timelineDate}>{item.date}</div>
                  <h3 style={timelineTitle}>{item.title}</h3>
                  <div style={timelineSubtitle}>{item.subtitle}</div>
                  <p style={timelineDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
