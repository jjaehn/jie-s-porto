import React, { useState } from 'react';
import SkillIcon from './SkillIcons';

function HexagonTile({ skill, isSelected, onClick, onMouseEnter }) {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`hexagon-skill-tile ${isSelected ? 'selected' : ''}`}
    >
      <svg viewBox="0 0 120 135" className="hexagon-svg">
        <defs>
          <linearGradient id={`hexBg-${skill.name.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isSelected ? "#721226" : "rgba(35, 10, 18, 0.9)"} />
            <stop offset="100%" stopColor={isSelected ? "#3A0712" : "rgba(18, 5, 9, 0.9)"} />
          </linearGradient>
          <linearGradient id={`hexBorder-${skill.name.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isSelected ? "#FFF8EE" : "#E0A96D"} stopOpacity={isSelected ? 1 : 0.65} />
            <stop offset="50%" stopColor={isSelected ? "#E0A96D" : "#8C1D36"} stopOpacity={isSelected ? 1 : 0.45} />
            <stop offset="100%" stopColor={isSelected ? "#D4AF37" : "#4A0D1A"} stopOpacity={isSelected ? 1 : 0.3} />
          </linearGradient>
        </defs>

        {/* Outer Hexagon Shell */}
        <polygon 
          points="60,3 115,33 115,95 60,125 5,95 5,33" 
          fill={`url(#hexBg-${skill.name.replace(/[^a-zA-Z0-9]/g, '')})`}
          stroke={`url(#hexBorder-${skill.name.replace(/[^a-zA-Z0-9]/g, '')})`}
          strokeWidth={isSelected ? "3.5" : "2"}
          strokeLinejoin="round"
        />

        {/* Inner Honeycomb Inset Line */}
        <polygon 
          points="60,9 109,36 109,92 60,119 11,92 11,36" 
          fill="none"
          stroke={isSelected ? "rgba(249, 246, 240, 0.6)" : "rgba(224, 169, 109, 0.2)"}
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
      </svg>

      {/* Hexagon Content */}
      <div className="hexagon-content">
        <SkillIcon name={skill.name} isSelected={isSelected} />
        <span className="hexagon-name">
          {skill.name}
        </span>
      </div>
    </div>
  );
}

function createHoneycombRows(items) {
  const total = items.length;
  if (total === 0) return [];

  const rows = [];
  let currentIndex = 0;
  let rowCapacity = 2; // Starts with 2 items at the top of pyramid

  while (currentIndex < total) {
    const remaining = total - currentIndex;
    let take = Math.min(rowCapacity, remaining);

    if (remaining - take === 1 && take > 2) {
      take -= 1;
    }

    rows.push(items.slice(currentIndex, currentIndex + take));
    currentIndex += take;
    rowCapacity += 1;
  }

  return rows;
}

export default function Skills() {
  const allSkills = [
    { name: "Artificial Intelligence", category: "AI Tools", level: "Expert", desc: "Building intelligent agents, decision frameworks, and autonomous reasoning systems.", icon: "🤖" },
    { name: "Machine Learning", category: "AI Tools", level: "Expert", desc: "Supervised & unsupervised learning, regression algorithms, classifiers, and model optimization.", icon: "🧠" },
    { name: "Computer Vision", category: "AI Tools", level: "Advanced", desc: "Object detection, face recognition, spatial segmentation, and real-time video frame processing.", icon: "👁️" },
    { name: "OpenCV", category: "AI Tools", level: "Advanced", desc: "Matrix operations, image filtering, contour extraction, and visual stream pipelines.", icon: "📷" },
    { name: "TensorFlow", category: "AI Frameworks", level: "Advanced", desc: "Designing deep neural networks, Keras sequential models, and model deployment.", icon: "🟧" },
    { name: "PyTorch", category: "AI Frameworks", level: "Expert", desc: "Dynamic computational graphs, tensor transformations, custom loss functions, and model training.", icon: "🔥" },
    { name: "HTML", category: "Frontend", level: "Expert", desc: "Semantic structure, accessible markup, and clean DOM hierarchy.", icon: "🌐" },
    { name: "CSS", category: "Frontend", level: "Expert", desc: "Vanilla CSS3 layouts, glassmorphic UI designs, keyframe micro-animations, and responsive grids.", icon: "🎨" },
    { name: "JavaScript", category: "Frontend", level: "Expert", desc: "Asynchronous application logic, modern ES6+, DOM interactions, and dynamic web interfaces.", icon: "⚡" },
    { name: "React", category: "Frontend", level: "Expert", desc: "Component architecture, custom hooks, state management, and modern SPA interfaces.", icon: "⚛️" },
    { name: "UI/UX Design", category: "Frontend", level: "Advanced", desc: "User research, wireframing, high-fidelity dark glassmorphic prototyping, and visual aesthetics.", icon: "📐" },
    { name: "Python", category: "Backend", level: "Expert", desc: "Primary research & development language for AI algorithms, automation scripts, and backend APIs.", icon: "🐍" },
    { name: "PHP", category: "Backend", level: "Intermediate", desc: "Server-side scripting, relational database queries, and web service integrations.", icon: "🐘" },
    { name: "Node.js", category: "Backend", level: "Advanced", desc: "Event-driven backend servers, RESTful microservices, and asynchronous I/O APIs.", icon: "🟩" },
    { name: "MySQL", category: "Backend", level: "Advanced", desc: "Relational database schema design, SQL querying, indexing, and data modeling.", icon: "🐬" },
    { name: "Firebase", category: "Backend", level: "Intermediate", desc: "Firestore NoSQL document databases, real-time sync, and user authentication.", icon: "🔥" },
    { name: "Git", category: "Tools", level: "Advanced", desc: "Version control workflows, branching strategies, commit tracking, and collaborative repos.", icon: "📦" }
  ];

  const categories = ["All", "AI Tools", "AI Frameworks", "Frontend", "Backend", "Tools"];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = activeCategory === "All" 
    ? allSkills 
    : allSkills.filter(s => s.category === activeCategory);

  const honeycombRows = createHoneycombRows(filteredSkills);

  const sectionStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const filterContainer = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.8rem',
    flexWrap: 'wrap',
    marginBottom: '3rem',
  };

  const filterBtn = (isActive) => ({
    padding: '0.6rem 1.4rem',
    borderRadius: '12px',
    border: isActive ? '1px solid rgba(224, 169, 109, 0.45)' : '1px solid rgba(255, 255, 255, 0.05)',
    background: isActive ? 'linear-gradient(135deg, rgba(140, 29, 54, 0.4), rgba(42, 8, 16, 0.6))' : 'rgba(22, 7, 12, 0.45)',
    color: isActive ? '#F9F6F0' : '#B3A4A9',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.9rem',
    fontWeight: isActive ? 600 : 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 0 15px rgba(140, 29, 54, 0.3)' : 'none',
  });

  const layoutGrid = {
    display: 'grid',
    gap: '3rem',
    alignItems: 'start',
  };

  const diagnosticPanel = {
    background: 'rgba(22, 7, 12, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: selectedSkill ? '1px solid rgba(224, 169, 109, 0.45)' : '1px solid rgba(224, 169, 109, 0.15)',
    borderRadius: '24px',
    padding: '2.5rem',
    position: 'sticky',
    top: '6rem',
    boxShadow: selectedSkill 
      ? '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 35px rgba(140, 29, 54, 0.35)' 
      : '0 15px 35px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.4s ease',
  };

  const diagBadge = {
    display: 'inline-block',
    padding: '0.35rem 0.9rem',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    backgroundColor: selectedSkill ? 'rgba(140, 29, 54, 0.35)' : 'rgba(255, 255, 255, 0.05)',
    border: selectedSkill ? '1px solid rgba(224, 169, 109, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)',
    color: selectedSkill ? '#E0A96D' : '#7A696F',
    marginBottom: '1rem',
  };

  const diagTitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2.2rem',
    fontWeight: 800,
    background: selectedSkill 
      ? 'linear-gradient(135deg, #F9F6F0 20%, #E0A96D 100%)' 
      : 'linear-gradient(135deg, #7A696F 20%, #4A3B40 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.8rem',
  };

  const diagDesc = {
    fontSize: '1rem',
    color: selectedSkill ? '#B3A4A9' : '#6E5C62',
    lineHeight: 1.65,
    marginBottom: '2rem',
    minHeight: '80px',
    fontStyle: selectedSkill ? 'normal' : 'italic',
  };

  const diagRow = {
    display: 'flex',
    gap: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  };

  const diagLabel = {
    fontSize: '0.75rem',
    color: '#7A696F',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.3rem',
    fontWeight: 600,
  };

  const diagVal = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    color: selectedSkill ? '#F9F6F0' : '#5C4A50',
  };

  return (
    <section id="skills" className="section" style={sectionStyle}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">HoneyComb Skill Architecture</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Category Filters */}
        <div style={filterContainer}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
              }}
              style={filterBtn(activeCategory === cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interlocking Honeycomb Pyramid Container */}
        <div className="horizontal-honeycomb-wrapper">
          {honeycombRows.map((rowItems, rowIndex) => (
            <div key={rowIndex} className="honeycomb-row">
              {rowItems.map(skill => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <HexagonTile
                    key={skill.name}
                    skill={skill}
                    isSelected={isSelected}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setSelectedSkill(skill)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
