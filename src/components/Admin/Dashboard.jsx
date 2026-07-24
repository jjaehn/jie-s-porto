import React, { useState, useEffect } from 'react';

export default function Dashboard({ onLogout, globalState, updateGlobalState }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', category: 'Computer Vision', tech: '', desc: '', caseStudy: '', github: 'https://github.com', demo: 'https://demo.com' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Expert', desc: '', category: 'Core AI' });
  const [studentName, setStudentName] = useState(globalState.studentName || 'JIhan Azaria Bibi');

  // Load contact messages on mount
  useEffect(() => {
    const loadedMsgs = JSON.parse(localStorage.getItem('lab_contact_messages') || '[]');
    setMessages(loadedMsgs);
  }, []);

  const deleteMessage = (id) => {
    const filtered = messages.filter(m => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('lab_contact_messages', JSON.stringify(filtered));
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    updateGlobalState('studentName', studentName);
    alert('Global Identity updated successfully.');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.desc) return;
    
    const formattedProject = {
      ...newProject,
      id: newProject.title.toLowerCase().replace(/\s+/g, '-'),
      tech: newProject.tech.split(',').map(t => t.trim()).filter(Boolean),
      span: "span 4",
      preview: (
        <div className="portfolio-preview safe-preview">
          <div className="safe-status">DEPLOYED</div>
        </div>
      )
    };

    const updatedProjects = [formattedProject, ...(globalState.projects || [])];
    updateGlobalState('projects', updatedProjects);
    
    // Reset form
    setNewProject({ title: '', category: 'Computer Vision', tech: '', desc: '', caseStudy: '', github: 'https://github.com', demo: 'https://demo.com' });
    alert('New laboratory project repository successfully deployed.');
  };

  const handleDeleteProject = (id) => {
    const filtered = globalState.projects.filter(p => p.id !== id);
    updateGlobalState('projects', filtered);
  };

  const dashboardContainer = {
    minHeight: '100vh',
    backgroundColor: '#0D0D0D',
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    position: 'relative',
    zIndex: 10,
  };

  const sidebar = {
    background: '#080808',
    borderRight: '1px solid rgba(122, 31, 61, 0.25)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  };

  const sidebarTitle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#D4AF37',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  };

  const navList = {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  };

  const navButton = (isActive) => ({
    width: '100%',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    background: isActive ? 'rgba(122, 31, 61, 0.2)' : 'transparent',
    border: 'none',
    color: isActive ? '#F8F5F2' : '#A09E9B',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.3s ease',
  });

  const mainPanel = {
    padding: '3rem',
    overflowY: 'auto',
    maxHeight: '100vh',
  };

  const pageHeader = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: '#F8F5F2',
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '1rem',
  };

  const statGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '2.5rem',
  };

  const statCard = {
    background: 'rgba(24, 24, 24, 0.5)',
    border: '1px solid rgba(122, 31, 61, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
  };

  const statTitle = {
    fontSize: '0.8rem',
    color: '#A09E9B',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  };

  const statValue = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#F8F5F2',
  };

  const formStyle = {
    background: 'rgba(24, 24, 24, 0.4)',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '650px',
  };

  const inputGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#F8F5F2',
  };

  const fieldStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    background: '#0D0D0D',
    border: '1px solid rgba(122, 31, 61, 0.2)',
    borderRadius: '8px',
    color: '#F8F5F2',
    fontFamily: 'inherit',
    outline: 'none',
  };

  const msgList = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const msgCard = {
    background: 'rgba(24, 24, 24, 0.4)',
    border: '1px solid rgba(224, 168, 153, 0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    position: 'relative',
  };

  const msgMeta = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#E0A899',
    marginBottom: '0.6rem',
    fontWeight: 600,
  };

  return (
    <div style={dashboardContainer}>
      {/* Sidebar Navigation */}
      <aside style={sidebar}>
        <div>
          <div style={sidebarTitle}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D4AF37', boxShadow: '0 0 6px #D4AF37' }} />
            LAB CONSOLE
          </div>
          <ul style={navList}>
            <li>
              <button 
                onClick={() => setActiveTab('overview')} 
                style={navButton(activeTab === 'overview')}
              >
                Telemetry Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('messages')} 
                style={navButton(activeTab === 'messages')}
              >
                Inbound Signals ({messages.length})
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('projects')} 
                style={navButton(activeTab === 'projects')}
              >
                Project Repository
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')} 
                style={navButton(activeTab === 'settings')}
              >
                Portal Settings
              </button>
            </li>
          </ul>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={onLogout} 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
          >
            Logout Console
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main style={mainPanel}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={pageHeader}>Laboratory Telemetry</h2>
            <div style={statGrid}>
              <div style={statCard}>
                <div style={statTitle}>Active Node Views</div>
                <div style={statValue}>1,482</div>
              </div>
              <div style={statCard}>
                <div style={statTitle}>Inbound signals</div>
                <div style={statValue}>{messages.length}</div>
              </div>
              <div style={statCard}>
                <div style={statTitle}>Active Repositories</div>
                <div style={statValue}>{globalState.projects?.length || 0}</div>
              </div>
              <div style={statCard}>
                <div style={statTitle}>System Diagnostics</div>
                <div style={{...statValue, color: '#D4AF37'}}>NOMINAL</div>
              </div>
            </div>

            {/* Custom SVG graph telemetry */}
            <div className="glass-card" style={{ padding: '2rem', height: '320px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', marginBottom: '1.5rem', color: '#F8F5F2' }}>
                Signal Frequency (Last 7 Cycles)
              </h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <svg viewBox="0 0 500 180" width="100%" height="100%">
                  <path
                    d="M 50 140 L 120 110 L 190 120 L 260 60 L 330 90 L 400 40 L 470 20"
                    fill="none"
                    stroke="#7A1F3D"
                    strokeWidth="3"
                  />
                  <path
                    d="M 50 140 L 120 110 L 190 120 L 260 60 L 330 90 L 400 40 L 470 20 L 470 160 L 50 160 Z"
                    fill="url(#gradient-telemetry)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="gradient-telemetry" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7A1F3D" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="50" y1="160" x2="470" y2="160" stroke="rgba(255,255,255,0.08)" />
                  <line x1="50" y1="100" x2="470" y2="100" stroke="rgba(255,255,255,0.04)" />
                  <line x1="50" y1="40" x2="470" y2="40" stroke="rgba(255,255,255,0.04)" />
                  {/* Labels */}
                  <text x="50" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-1</text>
                  <text x="120" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-2</text>
                  <text x="190" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-3</text>
                  <text x="260" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-4</text>
                  <text x="330" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-5</text>
                  <text x="400" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-6</text>
                  <text x="470" y="175" fill="#A09E9B" fontSize="9" textAnchor="middle">C-7</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 style={pageHeader}>Inbound Signal Packets</h2>
            {messages.length === 0 ? (
              <p style={{ color: '#A09E9B', fontStyle: 'italic' }}>No incoming communications logs recorded in the laboratory console database.</p>
            ) : (
              <div style={msgList}>
                {messages.map((msg) => (
                  <div key={msg.id} style={msgCard}>
                    <div style={msgMeta}>
                      <span>{msg.name} ({msg.email})</span>
                      <span>{new Date(msg.date).toLocaleString()}</span>
                    </div>
                    <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#F8F5F2', marginBottom: '0.8rem' }}>
                      Subject: {msg.subject || 'N/A'}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: '#A09E9B', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                      {msg.message}
                    </p>
                    <button 
                      onClick={() => deleteMessage(msg.id)} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', border: '1px solid rgba(122,31,61,0.4)', color: '#E0A899' }}
                    >
                      Delete Signal
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h2 style={pageHeader}>Project Repositories Manager</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }} className="project-manager-grid">
              
              {/* Form to Add Project */}
              <form onSubmit={handleAddProject} style={formStyle}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', color: '#F8F5F2' }}>Deploy New Repository</h3>
                
                <div style={inputGroup}>
                  <label style={labelStyle}>Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    style={fieldStyle}
                  />
                </div>

                <div style={inputGroup}>
                  <label style={labelStyle}>Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    style={fieldStyle}
                  >
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Deep Learning">Deep Learning</option>
                    <option value="NLP">NLP</option>
                    <option value="Web App">Web App</option>
                  </select>
                </div>

                <div style={inputGroup}>
                  <label style={labelStyle}>Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Python, PyTorch, React"
                    value={newProject.tech}
                    onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                    style={fieldStyle}
                  />
                </div>

                <div style={inputGroup}>
                  <label style={labelStyle}>Brief Objective</label>
                  <input
                    type="text"
                    required
                    value={newProject.desc}
                    onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                    style={fieldStyle}
                  />
                </div>

                <div style={inputGroup}>
                  <label style={labelStyle}>Detailed Case Study Findings</label>
                  <textarea
                    rows="4"
                    value={newProject.caseStudy}
                    onChange={(e) => setNewProject({ ...newProject, caseStudy: e.target.value })}
                    style={{...fieldStyle, resize: 'vertical'}}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
                  Deploy to Main Grid
                </button>
              </form>

              {/* List of active Projects */}
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', color: '#F8F5F2', marginBottom: '1.5rem' }}>Active Repositories</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {globalState.projects?.map(p => (
                    <div key={p.id} style={{ background: 'rgba(25, 25, 25, 0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#F8F5F2' }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#E0A899', textTransform: 'uppercase' }}>{p.category}</div>
                      </div>
                      <button 
                        onClick={() => handleDeleteProject(p.id)}
                        style={{ background: 'none', border: 'none', color: '#7A1F3D', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 style={pageHeader}>Console Configurations</h2>
            
            <form onSubmit={handleUpdateName} style={formStyle}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', color: '#F8F5F2' }}>Global Variables</h3>
              
              <div style={inputGroup}>
                <label style={labelStyle}>Researcher Identity (Name)</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={fieldStyle}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
                Commit Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
