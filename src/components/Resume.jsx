import React, { useState } from 'react';

export default function Resume() {
  const defaultResumeData = [
    {
      category: "Education",
      date: "2023 - Present",
      title: "B.S. in Informatics (AI Specialization)",
      subtitle: "President University",
      desc: "Specializing in Artificial Intelligence, Neural Networks, Computer Vision, and Web Development. Core coursework: Machine Learning, Deep Learning, Data Structures, Web Systems, Linear Algebra."
    },
    {
      category: "Education",
      date: "2020 - 2023",
      title: "Senior High School (Science & Mathematics)",
      subtitle: "Science Honors Track",
      desc: "Graduated with highest academic distinction. Focused on Advanced Mathematics, Physics, and introductory Python algorithm design."
    },
    {
      category: "Experience",
      date: "2025 - Present",
      title: "AI & Web Developer (Research Intern)",
      subtitle: "Artificial Intelligence Laboratory",
      desc: "Engineering Computer Vision object verification pipelines and full-stack React dashboards. Optimized edge inference latency for embedded camera nodes."
    },
    {
      category: "Experience",
      date: "2024 - 2025",
      title: "Software & AI Solutions Freelancer",
      subtitle: "Self-Employed",
      desc: "Built custom web applications and dataset management pipelines for academic research initiatives and small businesses."
    },
    {
      category: "Organizations",
      date: "2024 - Present",
      title: "Active Member & Coordinator",
      subtitle: "PUMA Informatics (President University)",
      desc: "Organizing tech workshops, AI seminars, programming hackathons, and community peer coding sessions for Informatics students."
    },
    {
      category: "Organizations",
      date: "2024 - Present",
      title: "Core Member",
      subtitle: "AI Student Collective",
      desc: "Leading weekly paper review circles focusing on Large Language Models, Computer Vision architectures, and ethical AI development."
    },
    {
      category: "Certifications",
      date: "2025",
      title: "TensorFlow Developer Certificate",
      subtitle: "Google",
      desc: "Validated expertise in building, training, and deploying deep neural network models for computer vision and NLP."
    },
    {
      category: "Certifications",
      date: "2025",
      title: "Deep Learning Specialization",
      subtitle: "DeepLearning.AI",
      desc: "Mastered multi-layer neural architectures, hyperparameter tuning, CNNs, and Sequence Models."
    },
    {
      category: "Certifications",
      date: "2024",
      title: "OpenCV Computer Vision Masterclass",
      subtitle: "OpenCV Association",
      desc: "Certified in image processing, matrix transformations, spatial feature extraction, and real-time video streaming."
    },
    {
      category: "Achievements",
      date: "2025 - 2026",
      title: "President University Academic Honor List",
      subtitle: "President University",
      desc: "Awarded Dean's Honor Distinction for maintaining top GPA in the Faculty of Computer Science & Informatics."
    },
    {
      category: "Achievements",
      date: "2025",
      title: "1st Place - National Vision & AI Hackathon",
      subtitle: "National Tech Alliance",
      desc: "Won 1st place for designing an on-device assistive currency identification model running under 48 hours."
    },
    {
      category: "Achievements",
      date: "2024",
      title: "Finalist - University Tech Innovation Award",
      subtitle: "President University AI Showcase",
      desc: "Selected as top finalist for presenting an AI-driven smart safety and monitoring prototype."
    }
  ];

  const [resumeData] = useState(() => {
    const saved = localStorage.getItem('lab_experiences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultResumeData;
  });

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const timelineWrapper = {
    maxWidth: '820px',
    margin: '0 auto',
    position: 'relative',
    paddingLeft: '2.8rem',
    borderLeft: '2px solid rgba(140, 29, 54, 0.35)',
  };

  const timelineItem = {
    position: 'relative',
    marginBottom: '3rem',
  };

  const timelineDot = {
    position: 'absolute',
    left: '-3.45rem',
    top: '0.2rem',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#070305',
    border: '3px solid #E0A96D',
    boxShadow: '0 0 12px #E0A96D',
    zIndex: 2,
  };

  const catBadge = {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    backgroundColor: 'rgba(140, 29, 54, 0.25)',
    border: '1px solid rgba(224, 169, 109, 0.2)',
    color: '#E0A96D',
    marginBottom: '0.6rem',
  };

  const timelineDate = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#E0A96D',
    letterSpacing: '0.08em',
    marginBottom: '0.3rem',
    textTransform: 'uppercase',
  };

  const timelineTitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.45rem',
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
    lineHeight: 1.65,
  };

  return (
    <section id="resume" className="section" style={sectionStyle}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Academic &amp; Professional Career</span>
          <h2 className="section-title">Experience</h2>
        </div>

        {/* Direct Timeline View (No category filter buttons) */}
        <div style={timelineWrapper}>
          {resumeData.map((item, idx) => (
            <div key={idx} style={timelineItem}>
              <div style={timelineDot} />
              <div style={catBadge}>{item.category}</div>
              <div style={timelineDate}>{item.date}</div>
              <h3 style={timelineTitle}>{item.title}</h3>
              <div style={timelineSubtitle}>{item.subtitle}</div>
              <p style={timelineDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
