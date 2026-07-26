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
    // 1. AI Tools
    { name: "Artificial Intelligence", category: "AI Tools", level: "Expert", desc: "Building autonomous agents, cognitive models, and intelligent decision systems.", icon: "🤖" },
    { name: "Machine Learning", category: "AI Tools", level: "Expert", desc: "Supervised & unsupervised learning, classification models, regression, and hyperparameter tuning.", icon: "🧠" },
    { name: "Deep Learning", category: "AI Tools", level: "Expert", desc: "Multi-layer neural networks, CNNs, RNNs, and deep representations.", icon: "🌌" },
    { name: "Computer Vision", category: "AI Tools", level: "Advanced", desc: "Biometric face verification, object detection, landmark tracking, and real-time video analytics.", icon: "👁️" },
    { name: "Natural Language Processing", category: "AI Tools", level: "Advanced", desc: "Text classification, sentiment analysis, language parsing, and vector embeddings.", icon: "💬" },
    { name: "Roboflow", category: "AI Tools", level: "Advanced", desc: "Computer vision dataset management, auto-labeling, image augmentation, and deployment.", icon: "🎯" },
    { name: "OpenCV", category: "AI Tools", level: "Advanced", desc: "Image filtering, contour detection, video frame manipulation, and camera pipelines.", icon: "📷" },
    { name: "TensorFlow", category: "AI Tools", level: "Advanced", desc: "Deep neural network architectures, Keras models, and edge model quantization.", icon: "🟧" },
    { name: "PyTorch", category: "AI Tools", level: "Expert", desc: "Dynamic computational graphs, custom loss functions, and CUDA tensor acceleration.", icon: "🔥" },
    { name: "Keras", category: "AI Tools", level: "Advanced", desc: "High-level neural network API for rapid model prototyping and training.", icon: "🔴" },

    // 2. AI Frameworks
    { name: "TensorFlow", category: "AI Frameworks", level: "Advanced", desc: "Deep neural network architectures, Keras models, and edge model quantization.", icon: "🟧" },
    { name: "PyTorch", category: "AI Frameworks", level: "Expert", desc: "Dynamic computational graphs, custom loss functions, and CUDA tensor acceleration.", icon: "🔥" },
    { name: "Keras", category: "AI Frameworks", level: "Advanced", desc: "High-level neural network API for rapid model prototyping and training.", icon: "🔴" },
    { name: "Scikit-learn", category: "AI Frameworks", level: "Expert", desc: "Classical machine learning estimators, random forests, SVMs, and evaluation metrics.", icon: "📊" },
    { name: "NLTK", category: "AI Frameworks", level: "Advanced", desc: "Natural Language Toolkit for tokenization, stemming, lemmatization, and POS tagging.", icon: "📖" },
    { name: "Gensim", category: "AI Frameworks", level: "Advanced", desc: "Topic modeling, Word2Vec vector space modeling, and document similarity analysis.", icon: "🌐" },
    { name: "OpenCV", category: "AI Frameworks", level: "Advanced", desc: "Image filtering, contour detection, video frame manipulation, and camera pipelines.", icon: "📷" },

    // 3. Frontend
    { name: "HTML5", category: "Frontend", level: "Expert", desc: "Semantic HTML5 markup, accessible DOM structure, and clean web layout standard.", icon: "🌐" },
    { name: "CSS3", category: "Frontend", level: "Expert", desc: "Vanilla CSS3 styling, glassmorphism, responsive grids, keyframes, and flexbox.", icon: "🎨" },
    { name: "JavaScript", category: "Frontend", level: "Expert", desc: "ES6+ modern syntax, async/await, DOM manipulation, and dynamic client logic.", icon: "⚡" },
    { name: "React.js", category: "Frontend", level: "Expert", desc: "Single Page Application architecture, custom hooks, state management, and reusable UI components.", icon: "⚛️" },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced", desc: "Utility-first CSS framework for rapid responsive design and modern styling.", icon: "🌊" },
    { name: "Bootstrap", category: "Frontend", level: "Advanced", desc: "Responsive grid systems, pre-built components, and rapid web prototyping.", icon: "🅱️" },
    { name: "Responsive Design", category: "Frontend", level: "Expert", desc: "Mobile-first layouts, fluid viewports, and multi-device cross-browser compatibility.", icon: "📱" },
    { name: "UI/UX Design", category: "Frontend", level: "Advanced", desc: "User interface design, wireframing, high-fidelity dark glassmorphic mockups, and visual polish.", icon: "📐" },

    // 4. Backend
    { name: "Python", category: "Backend", level: "Expert", desc: "Primary backend language for AI modeling, data pipelines, and server scripts.", icon: "🐍" },
    { name: "PHP", category: "Backend", level: "Intermediate", desc: "Server-side scripting, relational database queries, and dynamic web services.", icon: "🐘" },
    { name: "Node.js", category: "Backend", level: "Advanced", desc: "Asynchronous JavaScript runtime, Express REST microservices, and server logic.", icon: "🟩" },
    { name: "Firebase", category: "Backend", level: "Advanced", desc: "Cloud Realtime Database, Firestore NoSQL, authentication, and hosting.", icon: "🔥" },
    { name: "MySQL", category: "Backend", level: "Advanced", desc: "Relational database design, complex SQL queries, indexes, and data integrity.", icon: "🐬" },
    { name: "REST API", category: "Backend", level: "Expert", desc: "Designing and consuming RESTful HTTP endpoints, JSON payloads, and webhooks.", icon: "🔌" },
    { name: "Authentication", category: "Backend", level: "Advanced", desc: "Secure passcode auth, JWT tokens, session state, and security passcodes.", icon: "🔒" },

    // 5. Tools
    { name: "Git", category: "Tools", level: "Advanced", desc: "Distributed version control, branch management, merge conflict resolution, and commits.", icon: "📦" },
    { name: "GitHub", category: "Tools", level: "Advanced", desc: "Remote repository hosting, team collaboration, GitHub Actions, and project releases.", icon: "🐙" },
    { name: "Visual Studio Code", category: "Tools", level: "Expert", desc: "Primary IDE environment with custom extensions, debugging tools, and git integration.", icon: "💻" },
    { name: "Figma", category: "Tools", level: "Advanced", desc: "Collaborative UI/UX design, vector graphics, component libraries, and interactive prototypes.", icon: "🎨" },
    { name: "Canva", category: "Tools", level: "Advanced", desc: "Graphic design, presentation decks, promotional banners, and visual media creation.", icon: "🖼️" },
    { name: "Google Colab", category: "Tools", level: "Expert", desc: "Cloud GPU/TPU Jupyter notebooks for training AI/ML models and data analysis.", icon: "☁️" },
    { name: "Android Studio", category: "Tools", level: "Intermediate", desc: "Mobile app development IDE, Android emulator testing, and Java/Kotlin builds.", icon: "🤖" },
    { name: "Firebase Console", category: "Tools", level: "Advanced", desc: "Managing Firebase projects, database security rules, and real-time monitoring.", icon: "🔥" },
    { name: "Postman", category: "Tools", level: "Advanced", desc: "API testing, inspecting HTTP requests/responses, and automated endpoint testing.", icon: "🚀" },
    { name: "Blender", category: "Tools", level: "Intermediate", desc: "3D computer graphics software for modeling, rendering, and visual assets.", icon: "🧊" }
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
