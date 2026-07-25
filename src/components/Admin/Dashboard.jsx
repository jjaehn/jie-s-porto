import React, { useState, useEffect } from 'react';

export default function Dashboard({ onLogout, globalState, updateGlobalState }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'experience' | 'messages' | 'profile'
  
  // State Collections
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [messages, setMessages] = useState([]);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Jihan Azaria Bibi',
    email: 'jihan.azaria@student.president.ac.id',
    avatar: '/ai_researcher_portrait.png',
    role: 'Laboratory Admin'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  // Search & Filter States
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategory, setProjectCategory] = useState('All');
  const [projectPage, setProjectPage] = useState(1);
  const projectsPerPage = 6;

  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState('All');
  const [messagePage, setMessagePage] = useState(1);
  const messagesPerPage = 5;

  // Modals & UI Feedback
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [projectModal, setProjectModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [experienceModal, setExperienceModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
  const [toasts, setToasts] = useState([]);

  // Toast Handler
  const showToast = (title, message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Initial Load from LocalStorage
  useEffect(() => {
    // 1. Projects
    const storedProjects = localStorage.getItem('lab_projects');
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects));
      } catch (e) { console.error(e); }
    } else {
      const defaultProjects = [
        {
          id: "smart-safe",
          title: "Smart Safe Facial Lockbox",
          category: "Computer Vision",
          tech: ["Python", "OpenCV", "YOLOv8", "Raspberry Pi"],
          desc: "An intelligent security safe integrating biometric facial verification and real-time anomaly object detection.",
          fullDesc: "Designed a multi-modal hardware security box. Achieved 99.2% face verification accuracy under dim lighting with low edge latency.",
          github: "https://github.com",
          demo: "https://demo.com",
          figma: "",
          date: "2025-11-15",
          image: "",
          status: "published",
          featured: true,
          previewType: "safe"
        },
        {
          id: "currency-detection",
          title: "Real-Time Currency Classifier",
          category: "Machine Learning",
          tech: ["PyTorch", "MobileNetV3", "CoreML", "Python"],
          desc: "On-device mobile vision pipeline classifying currencies in real-time for visually impaired laboratory assistants.",
          fullDesc: "Quantized MobileNet model weights to 8MB. Integrated real-time audio voice prompts for instant currency recognition.",
          github: "https://github.com",
          demo: "https://demo.com",
          figma: "",
          date: "2025-08-20",
          image: "",
          status: "published",
          featured: true,
          previewType: "currency"
        },
        {
          id: "face-emotion",
          title: "Facial Emotion Recognition",
          category: "Computer Vision",
          tech: ["Python", "OpenCV", "TensorFlow", "Keras"],
          desc: "Analyzes video streams to classify 7 emotion states, tracking engagement metrics in user-testing laboratory experiments.",
          fullDesc: "Trained CNN on FER2013 with 468 landmark mesh points. Streamed real-time emotion telemetry via WebSocket.",
          github: "https://github.com",
          demo: "https://demo.com",
          figma: "",
          date: "2025-05-10",
          image: "",
          status: "published",
          featured: false,
          previewType: "emotion"
        },
        {
          id: "pm-system",
          title: "AI-Driven PM System",
          category: "Web Applications",
          tech: ["React", "Firebase", "Node.js", "MySQL"],
          desc: "Project management system predicting task bottlenecks and suggesting timeline changes based on historic developer speed.",
          fullDesc: "Built a random forest estimator serving JSON predictions to a glassmorphic React dashboard connected to Firebase.",
          github: "https://github.com",
          demo: "https://demo.com",
          figma: "",
          date: "2025-03-01",
          image: "",
          status: "published",
          featured: false,
          previewType: "pm"
        },
        {
          id: "ai-chatbot",
          title: "Neural Lab Assistant (RAG)",
          category: "AI Projects",
          tech: ["Python", "LangChain", "LLaMA-3", "ChromaDB"],
          desc: "Retrieval-Augmented Chatbot parsing laboratory documentation files and serving immediate configuration procedures.",
          fullDesc: "Ingested 400 pages of lab user guides into Chroma vector database. Used LangChain to resolve queries locally.",
          github: "https://github.com",
          demo: "https://demo.com",
          figma: "",
          date: "2025-01-18",
          image: "",
          status: "published",
          featured: true,
          previewType: "chatbot"
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('lab_projects', JSON.stringify(defaultProjects));
    }

    // 2. Experiences
    const storedExp = localStorage.getItem('lab_experiences');
    if (storedExp) {
      try {
        setExperiences(JSON.parse(storedExp));
      } catch (e) { console.error(e); }
    } else {
      const defaultExp = [
        {
          id: 1,
          category: "Education",
          date: "2023 - Present",
          title: "B.S. in Informatics (AI Specialization)",
          subtitle: "President University",
          desc: "Specializing in Artificial Intelligence, Neural Networks, Computer Vision, and Web Development. Core coursework: Machine Learning, Deep Learning, Data Structures, Web Systems, Linear Algebra."
        },
        {
          id: 2,
          category: "Education",
          date: "2020 - 2023",
          title: "Senior High School (Science & Mathematics)",
          subtitle: "Science Honors Track",
          desc: "Graduated with highest academic distinction. Focused on Advanced Mathematics, Physics, and introductory Python algorithm design."
        },
        {
          id: 3,
          category: "Experience",
          date: "2025 - Present",
          title: "AI & Web Developer (Research Intern)",
          subtitle: "Artificial Intelligence Laboratory",
          desc: "Engineering Computer Vision object verification pipelines and full-stack React dashboards. Optimized edge inference latency for embedded camera nodes."
        },
        {
          id: 4,
          category: "Experience",
          date: "2024 - 2025",
          title: "Software & AI Solutions Freelancer",
          subtitle: "Self-Employed",
          desc: "Built custom web applications and dataset management pipelines for academic research initiatives and small businesses."
        },
        {
          id: 5,
          category: "Organizations",
          date: "2024 - Present",
          title: "Active Member & Coordinator",
          subtitle: "PUMA Informatics (President University)",
          desc: "Organizing tech workshops, AI seminars, programming hackathons, and community peer coding sessions for Informatics students."
        },
        {
          id: 6,
          category: "Certifications",
          date: "2025",
          title: "TensorFlow Developer Certificate",
          subtitle: "Google",
          desc: "Validated expertise in building, training, and deploying deep neural network models for computer vision and NLP."
        }
      ];
      setExperiences(defaultExp);
      localStorage.setItem('lab_experiences', JSON.stringify(defaultExp));
    }

    // 3. Messages
    const storedMsgs = localStorage.getItem('lab_contact_messages');
    if (storedMsgs) {
      try {
        setMessages(JSON.parse(storedMsgs));
      } catch (e) { console.error(e); }
    } else {
      const sampleMsgs = [
        {
          id: 101,
          name: "Dr. Jonathan Hayes",
          email: "j.hayes@techinstitute.org",
          subject: "AI Research Collaboration Proposal",
          message: "Greetings Jihan, we reviewed your CV & Edge AI projects. We would love to invite you for a guest presentation on your face verification lockbox model.",
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
          read: false
        },
        {
          id: 102,
          name: "Elena Rostova",
          email: "elena@innovateweb.io",
          subject: "Full-Stack AI Project Discussion",
          message: "Hi Jihan! Impressive portfolio. We are looking for an AI/React developer to build an intelligent dashboard. Are you available for freelance projects?",
          date: new Date(Date.now() - 86400000 * 5).toISOString(),
          read: true
        }
      ];
      setMessages(sampleMsgs);
      localStorage.setItem('lab_contact_messages', JSON.stringify(sampleMsgs));
    }

    // 4. Admin Profile
    const storedProfile = localStorage.getItem('lab_admin_profile');
    if (storedProfile) {
      try {
        setAdminProfile(JSON.parse(storedProfile));
      } catch (e) { console.error(e); }
    }
  }, []);

  // Save Handlers
  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('lab_projects', JSON.stringify(newProjects));
    if (updateGlobalState) updateGlobalState('projects', newProjects);
    setLastUpdated(new Date().toLocaleString());
  };

  const saveExperiences = (newExp) => {
    setExperiences(newExp);
    localStorage.setItem('lab_experiences', JSON.stringify(newExp));
    setLastUpdated(new Date().toLocaleString());
  };

  const saveMessages = (newMsgs) => {
    setMessages(newMsgs);
    localStorage.setItem('lab_contact_messages', JSON.stringify(newMsgs));
  };

  const saveAdminProfile = (newProfile) => {
    setAdminProfile(newProfile);
    localStorage.setItem('lab_admin_profile', JSON.stringify(newProfile));
    if (updateGlobalState && newProfile.name) updateGlobalState('studentName', newProfile.name);
    setLastUpdated(new Date().toLocaleString());
  };

  // --- PROJECTS CRUD ---
  const handleOpenAddProject = () => {
    setProjectModal({
      isOpen: true,
      mode: 'add',
      data: {
        id: '',
        title: '',
        category: 'AI Projects',
        tech: '',
        desc: '',
        fullDesc: '',
        github: '',
        demo: '',
        figma: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        status: 'published',
        featured: false
      }
    });
  };

  const handleOpenEditProject = (proj) => {
    setProjectModal({
      isOpen: true,
      mode: 'edit',
      data: {
        ...proj,
        tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech || ''
      }
    });
  };

  const handleSaveProjectForm = (e) => {
    e.preventDefault();
    const formData = projectModal.data;
    if (!formData.title || !formData.desc) {
      showToast('Validation Error', 'Title and Description are required', 'error');
      return;
    }

    const techArray = typeof formData.tech === 'string' 
      ? formData.tech.split(',').map(t => t.trim()).filter(Boolean)
      : formData.tech;

    if (projectModal.mode === 'add') {
      const newProj = {
        ...formData,
        id: formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        tech: techArray,
        previewType: 'safe'
      };
      saveProjects([newProj, ...projects]);
      showToast('Project Created', `"${formData.title}" added successfully.`);
    } else {
      const updated = projects.map(p => p.id === formData.id ? { ...formData, tech: techArray } : p);
      saveProjects(updated);
      showToast('Project Updated', `"${formData.title}" changes saved.`);
    }

    setProjectModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleDeleteProject = (proj) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Project',
      message: `Are you sure you want to delete "${proj.title}"? This action cannot be undone.`,
      onConfirm: () => {
        const filtered = projects.filter(p => p.id !== proj.id);
        saveProjects(filtered);
        showToast('Project Deleted', `"${proj.title}" was removed.`, 'error');
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const toggleProjectStatus = (id) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'published' ? 'draft' : 'published';
        showToast('Status Changed', `Project set to ${nextStatus.toUpperCase()}`);
        return { ...p, status: nextStatus };
      }
      return p;
    });
    saveProjects(updated);
  };

  const toggleProjectFeatured = (id) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        showToast('Featured Toggled', p.featured ? 'Removed from featured' : 'Marked as featured');
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    saveProjects(updated);
  };

  // --- EXPERIENCE CRUD ---
  const handleOpenAddExperience = () => {
    setExperienceModal({
      isOpen: true,
      mode: 'add',
      data: {
        id: Date.now(),
        category: 'Experience',
        date: '2025 - Present',
        title: '',
        subtitle: '',
        desc: ''
      }
    });
  };

  const handleOpenEditExperience = (item) => {
    setExperienceModal({
      isOpen: true,
      mode: 'edit',
      data: { ...item }
    });
  };

  const handleSaveExperienceForm = (e) => {
    e.preventDefault();
    const formData = experienceModal.data;
    if (!formData.title || !formData.subtitle) {
      showToast('Validation Error', 'Title and Organization are required', 'error');
      return;
    }

    if (experienceModal.mode === 'add') {
      const newExp = { ...formData, id: Date.now() };
      saveExperiences([newExp, ...experiences]);
      showToast('Experience Added', `"${formData.title}" added to timeline.`);
    } else {
      const updated = experiences.map(e => e.id === formData.id ? formData : e);
      saveExperiences(updated);
      showToast('Experience Updated', `"${formData.title}" saved.`);
    }

    setExperienceModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleDeleteExperience = (item) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Experience Item',
      message: `Are you sure you want to remove "${item.title}"?`,
      onConfirm: () => {
        const filtered = experiences.filter(e => e.id !== item.id);
        saveExperiences(filtered);
        showToast('Experience Removed', `Item deleted successfully.`, 'error');
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const moveExperience = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const reordered = [...experiences];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    saveExperiences(reordered);
    showToast('Reordered', 'Timeline items reordered successfully.');
  };

  // --- MESSAGES HANDLERS ---
  const toggleMessageRead = (msgId) => {
    const updated = messages.map(m => {
      if (m.id === msgId) {
        return { ...m, read: !m.read };
      }
      return m;
    });
    saveMessages(updated);
  };

  const handleDeleteMessage = (msgId) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Contact Signal',
      message: 'Are you sure you want to permanently delete this message?',
      onConfirm: () => {
        const filtered = messages.filter(m => m.id !== msgId);
        saveMessages(filtered);
        if (selectedMessage?.id === msgId) setSelectedMessage(null);
        showToast('Message Deleted', 'Signal packet removed from database.', 'error');
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // --- PROFILE HANDLER ---
  const [profileForm, setProfileForm] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    avatar: adminProfile.avatar,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (profileForm.newPassword) {
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        showToast('Password Mismatch', 'New passwords do not match.', 'error');
        return;
      }
      showToast('Security Updated', 'Admin passcode updated successfully.');
    }

    const updated = {
      ...adminProfile,
      name: profileForm.name,
      email: profileForm.email,
      avatar: profileForm.avatar
    };
    saveAdminProfile(updated);
    showToast('Profile Saved', 'Admin account settings updated.');
  };

  // Filtered Collections
  const filteredProjects = projects.filter(p => {
    const matchesCategory = projectCategory === 'All' || p.category === projectCategory;
    const matchesSearch = p.title.toLowerCase().includes(projectSearch.toLowerCase()) || 
                          p.desc.toLowerCase().includes(projectSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedProjects = filteredProjects.slice((projectPage - 1) * projectsPerPage, projectPage * projectsPerPage);
  const totalProjectPages = Math.ceil(filteredProjects.length / projectsPerPage) || 1;

  const filteredMessages = messages.filter(m => {
    const matchesRead = messageFilter === 'All' ? true : messageFilter === 'Read' ? m.read : !m.read;
    const matchesSearch = m.name.toLowerCase().includes(messageSearch.toLowerCase()) || 
                          m.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
                          m.subject?.toLowerCase().includes(messageSearch.toLowerCase()) ||
                          m.message.toLowerCase().includes(messageSearch.toLowerCase());
    return matchesRead && matchesSearch;
  });

  const paginatedMessages = filteredMessages.slice((messagePage - 1) * messagesPerPage, messagePage * messagesPerPage);
  const totalMessagePages = Math.ceil(filteredMessages.length / messagesPerPage) || 1;

  const unreadMessagesCount = messages.filter(m => !m.read).length;
  const publishedProjectsCount = projects.filter(p => p.status === 'published').length;

  // Inline CSS Tokens
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#070305',
    color: '#F9F6F0',
    fontFamily: "'Inter', sans-serif",
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    position: 'relative',
    zIndex: 10
  };

  const sidebarStyle = {
    backgroundColor: '#120509',
    borderRight: '1px solid rgba(224, 169, 109, 0.2)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const navItemBtn = (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.85rem 1.1rem',
    borderRadius: '12px',
    backgroundColor: isActive ? 'rgba(140, 29, 54, 0.4)' : 'transparent',
    border: isActive ? '1px solid rgba(224, 169, 109, 0.35)' : '1px solid transparent',
    color: isActive ? '#F9F6F0' : '#B3A4A9',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.92rem',
    fontWeight: isActive ? 600 : 500,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.3s ease',
    marginBottom: '0.5rem'
  });

  const mainPanelStyle = {
    padding: '2.5rem 3rem',
    overflowY: 'auto',
    maxHeight: '100vh'
  };

  const pageHeader = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2.2rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #F9F6F0 20%, #E0A96D 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.4rem'
  };

  const cardStyle = {
    backgroundColor: 'rgba(22, 7, 12, 0.75)',
    border: '1px solid rgba(224, 169, 109, 0.2)',
    borderRadius: '20px',
    padding: '1.8rem',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
  };

  const fieldInputStyle = {
    width: '100%',
    padding: '0.85rem 1.1rem',
    backgroundColor: 'rgba(7, 3, 5, 0.85)',
    border: '1px solid rgba(224, 169, 109, 0.25)',
    borderRadius: '10px',
    color: '#F9F6F0',
    fontSize: '0.92rem',
    outline: 'none',
    fontFamily: 'inherit'
  };

  return (
    <div style={containerStyle}>
      {/* --- TOAST NOTIFICATION CONTAINER --- */}
      <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {toasts.map(t => (
          <div 
            key={t.id} 
            style={{
              minWidth: '280px',
              padding: '1rem 1.4rem',
              borderRadius: '14px',
              backgroundColor: t.type === 'error' ? 'rgba(140, 29, 54, 0.95)' : 'rgba(35, 10, 18, 0.95)',
              border: t.type === 'error' ? '1px solid #A31C38' : '1px solid #E0A96D',
              color: '#F9F6F0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(224, 169, 109, 0.3)',
              backdropFilter: 'blur(15px)',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#E0A96D', marginBottom: '0.2rem' }}>{t.title}</div>
            <div style={{ fontSize: '0.82rem', color: '#E6D7DC' }}>{t.message}</div>
          </div>
        ))}
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {confirmModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9990, backgroundColor: 'rgba(7, 3, 5, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ ...cardStyle, maxWidth: '420px', width: '100%', textCenter: 'center', border: '1px solid rgba(224, 169, 109, 0.4)' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', color: '#F9F6F0', marginBottom: '0.8rem' }}>{confirmModal.title}</h3>
            <p style={{ fontSize: '0.92rem', color: '#B3A4A9', marginBottom: '1.8rem', lineHeight: 1.5 }}>{confirmModal.message}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })} 
                className="btn btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmModal.onConfirm} 
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem', backgroundColor: '#8C1D36' }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside style={sidebarStyle}>
        <div>
          {/* Admin Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '2.5rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(224, 169, 109, 0.15)' }}>
            <img 
              src={adminProfile.avatar} 
              alt="Admin Avatar" 
              style={{ width: '46px', height: '46px', borderRadius: '50%', border: '2px solid #E0A96D', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F9F6F0' }}>{adminProfile.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#E0A96D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{adminProfile.role}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav>
            <button onClick={() => setActiveTab('overview')} style={navItemBtn(activeTab === 'overview')}>
              <span>📊</span> Dashboard
            </button>
            <button onClick={() => setActiveTab('projects')} style={navItemBtn(activeTab === 'projects')}>
              <span>📂</span> Projects ({projects.length})
            </button>
            <button onClick={() => setActiveTab('experience')} style={navItemBtn(activeTab === 'experience')}>
              <span>💼</span> Experience ({experiences.length})
            </button>
            <button onClick={() => setActiveTab('messages')} style={navItemBtn(activeTab === 'messages')}>
              <span>📩</span> Contact Messages {unreadMessagesCount > 0 && <span style={{ backgroundColor: '#8C1D36', color: '#FFF', borderRadius: '10px', padding: '0.1rem 0.5rem', fontSize: '0.72rem', marginLeft: 'auto' }}>{unreadMessagesCount}</span>}
            </button>
            <button onClick={() => setActiveTab('profile')} style={navItemBtn(activeTab === 'profile')}>
              <span>👤</span> Admin Profile
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <div>
          <button 
            onClick={() => {
              setConfirmModal({
                isOpen: true,
                title: 'Logout Console',
                message: 'Are you sure you want to end your administrative session?',
                onConfirm: onLogout
              });
            }}
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.88rem', justifyContent: 'center' }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN PANEL CONTENT --- */}
      <main style={mainPanelStyle}>
        
        {/* ================= 1. DASHBOARD OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={pageHeader}>Dashboard Overview</h2>
                <p style={{ fontSize: '0.9rem', color: '#B3A4A9' }}>Real-time telemetry and management controls for your portfolio.</p>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#E0A96D', backgroundColor: 'rgba(140, 29, 54, 0.25)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(224, 169, 109, 0.3)' }}>
                Last Updated: {lastUpdated}
              </div>
            </div>

            {/* Summary Statistic Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E0A96D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Projects</span>
                  <span style={{ fontSize: '1.4rem' }}>📂</span>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: '#F9F6F0' }}>{projects.length}</div>
                <div style={{ fontSize: '0.78rem', color: '#7A696F', marginTop: '0.4rem' }}>{publishedProjectsCount} published / {projects.length - publishedProjectsCount} draft</div>
              </div>

              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E0A96D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Experiences</span>
                  <span style={{ fontSize: '1.4rem' }}>💼</span>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: '#F9F6F0' }}>{experiences.length}</div>
                <div style={{ fontSize: '0.78rem', color: '#7A696F', marginTop: '0.4rem' }}>Education &amp; Work career milestones</div>
              </div>

              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E0A96D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact Messages</span>
                  <span style={{ fontSize: '1.4rem' }}>📩</span>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: '#F9F6F0' }}>{messages.length}</div>
                <div style={{ fontSize: '0.78rem', color: unreadMessagesCount > 0 ? '#E0A96D' : '#7A696F', marginTop: '0.4rem' }}>
                  {unreadMessagesCount} unread message{unreadMessagesCount !== 1 ? 's' : ''}
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E0A96D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>System Status</span>
                  <span style={{ fontSize: '1.4rem' }}>⚡</span>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: '#D4AF37' }}>ONLINE</div>
                <div style={{ fontSize: '0.78rem', color: '#7A696F', marginTop: '0.4rem' }}>Vercel Edge &amp; Storage synced</div>
              </div>
            </div>

            {/* Quick Actions & Recent Messages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
              <div style={cardStyle}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', color: '#F9F6F0', marginBottom: '1.2rem' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button onClick={handleOpenAddProject} className="btn btn-primary" style={{ padding: '0.9rem', fontSize: '0.88rem' }}>
                    ➕ Add New Project
                  </button>
                  <button onClick={handleOpenAddExperience} className="btn btn-secondary" style={{ padding: '0.9rem', fontSize: '0.88rem' }}>
                    ➕ Add Experience
                  </button>
                  <button onClick={() => setActiveTab('messages')} className="btn btn-secondary" style={{ padding: '0.9rem', fontSize: '0.88rem' }}>
                    📥 View Inbox ({unreadMessagesCount})
                  </button>
                  <button onClick={() => setActiveTab('profile')} className="btn btn-secondary" style={{ padding: '0.9rem', fontSize: '0.88rem' }}>
                    ⚙️ Edit Admin Profile
                  </button>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', color: '#F9F6F0', marginBottom: '1.2rem' }}>Recent Messages</h3>
                {messages.length === 0 ? (
                  <p style={{ color: '#7A696F', fontSize: '0.88rem' }}>No contact messages recorded yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {messages.slice(0, 3).map(m => (
                      <div 
                        key={m.id} 
                        onClick={() => { setSelectedMessage(m); setActiveTab('messages'); }}
                        style={{ padding: '0.8rem', borderRadius: '10px', backgroundColor: 'rgba(7, 3, 5, 0.6)', border: '1px solid rgba(224, 169, 109, 0.15)', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: '#E0A96D' }}>
                          <span>{m.name}</span>
                          <span>{new Date(m.date).toLocaleDateString()}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#F9F6F0', marginTop: '0.2rem' }}>{m.subject || 'No Subject'}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. PROJECTS MANAGEMENT (CRUD) ================= */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={pageHeader}>Projects Management</h2>
                <p style={{ fontSize: '0.9rem', color: '#B3A4A9' }}>Add, edit, publish, feature, or remove portfolio projects.</p>
              </div>
              <button onClick={handleOpenAddProject} className="btn btn-primary">
                ➕ Add New Project
              </button>
            </div>

            {/* Controls: Search & Category Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Search projects by title or description..."
                value={projectSearch}
                onChange={(e) => { setProjectSearch(e.target.value); setProjectPage(1); }}
                style={{ ...fieldInputStyle, maxWidth: '350px' }}
              />
              <select
                value={projectCategory}
                onChange={(e) => { setProjectCategory(e.target.value); setProjectPage(1); }}
                style={{ ...fieldInputStyle, maxWidth: '220px' }}
              >
                <option value="All">All Categories</option>
                <option value="AI Projects">AI Projects</option>
                <option value="Web Applications">Web Applications</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="IoT Projects">IoT Projects</option>
                <option value="Research Projects">Research Projects</option>
              </select>
            </div>

            {/* Projects Grid View */}
            {paginatedProjects.length === 0 ? (
              <div style={{ ...cardStyle, textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', color: '#F9F6F0', marginBottom: '0.5rem' }}>No Projects Found</h3>
                <p style={{ color: '#B3A4A9', fontSize: '0.9rem', marginBottom: '1.5rem' }}>No projects matched your search criteria or category filter.</p>
                <button onClick={handleOpenAddProject} className="btn btn-primary">
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {paginatedProjects.map((p) => (
                  <div key={p.id} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {/* Top Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E0A96D', backgroundColor: 'rgba(140, 29, 54, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '10px', border: '1px solid rgba(224, 169, 109, 0.2)' }}>
                        {p.category}
                      </span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <button 
                          onClick={() => toggleProjectFeatured(p.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: p.featured ? '#D4AF37' : '#5C4A50' }}
                          title={p.featured ? "Featured Project" : "Make Featured"}
                        >
                          ★
                        </button>
                        <button 
                          onClick={() => toggleProjectStatus(p.id)}
                          style={{ fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', border: 'none', borderRadius: '8px', padding: '0.2rem 0.5rem', backgroundColor: p.status === 'published' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(255, 193, 7, 0.2)', color: p.status === 'published' ? '#4CD964' : '#FFCC00' }}
                        >
                          {p.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
                        </button>
                      </div>
                    </div>

                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F9F6F0', marginBottom: '0.4rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#B3A4A9', lineHeight: 1.5, marginBottom: '1.2rem', flex: 1 }}>{p.desc}</p>

                    {/* Tech Stack */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {(Array.isArray(p.tech) ? p.tech : []).map(t => (
                        <span key={t} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#E0A96D' }}>{t}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.8rem', paddingTop: '1rem', borderTop: '1px solid rgba(224, 169, 109, 0.15)' }}>
                      <button onClick={() => handleOpenEditProject(p)} className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.82rem' }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDeleteProject(p)} className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.82rem', borderColor: 'rgba(140, 29, 54, 0.5)', color: '#E0A899' }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalProjectPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {Array.from({ length: totalProjectPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProjectPage(i + 1)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(224, 169, 109, 0.2)',
                      backgroundColor: projectPage === i + 1 ? 'rgba(140, 29, 54, 0.6)' : 'rgba(7, 3, 5, 0.6)',
                      color: '#F9F6F0',
                      cursor: 'pointer'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= 3. EXPERIENCE MANAGEMENT (CRUD) ================= */}
        {activeTab === 'experience' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={pageHeader}>Experience &amp; Career Milestones</h2>
                <p style={{ fontSize: '0.9rem', color: '#B3A4A9' }}>Manage education, internships, freelance work, organizations, and achievements.</p>
              </div>
              <button onClick={handleOpenAddExperience} className="btn btn-primary">
                ➕ Add Experience Item
              </button>
            </div>

            {/* Timeline List View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {experiences.map((exp, index) => (
                <div key={exp.id || index} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E0A96D', backgroundColor: 'rgba(140, 29, 54, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>
                        {exp.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#E0A96D', fontWeight: 600 }}>{exp.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#F9F6F0', marginBottom: '0.2rem' }}>{exp.title}</h3>
                    <div style={{ fontSize: '0.92rem', color: '#D4AF37', fontWeight: 600, marginBottom: '0.6rem' }}>{exp.subtitle}</div>
                    <p style={{ fontSize: '0.88rem', color: '#B3A4A9', lineHeight: 1.5 }}>{exp.desc}</p>
                  </div>

                  {/* Actions & Reordering */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => moveExperience(index, -1)} 
                      disabled={index === 0}
                      style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(224,169,109,0.2)', color: '#F9F6F0', cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button 
                      onClick={() => moveExperience(index, 1)} 
                      disabled={index === experiences.length - 1}
                      style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(224,169,109,0.2)', color: '#F9F6F0', cursor: index === experiences.length - 1 ? 'not-allowed' : 'pointer', opacity: index === experiences.length - 1 ? 0.3 : 1 }}
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button onClick={() => handleOpenEditExperience(exp)} className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.82rem' }}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDeleteExperience(exp)} className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.82rem', borderColor: 'rgba(140, 29, 54, 0.5)', color: '#E0A899' }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. CONTACT MESSAGES (INBOX) ================= */}
        {activeTab === 'messages' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={pageHeader}>Contact Messages Inbox</h2>
                <p style={{ fontSize: '0.9rem', color: '#B3A4A9' }}>Manage communications submitted through your portfolio contact form.</p>
              </div>
            </div>

            {/* Filter & Search Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Search messages by sender, email, subject..."
                value={messageSearch}
                onChange={(e) => { setMessageSearch(e.target.value); setMessagePage(1); }}
                style={{ ...fieldInputStyle, maxWidth: '350px' }}
              />
              <select
                value={messageFilter}
                onChange={(e) => { setMessageFilter(e.target.value); setMessagePage(1); }}
                style={{ ...fieldInputStyle, maxWidth: '200px' }}
              >
                <option value="All">All Messages</option>
                <option value="Unread">Unread Only</option>
                <option value="Read">Read Only</option>
              </select>
            </div>

            {/* Table View */}
            {paginatedMessages.length === 0 ? (
              <div style={{ ...cardStyle, textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📩</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', color: '#F9F6F0', marginBottom: '0.5rem' }}>No Messages Found</h3>
                <p style={{ color: '#B3A4A9', fontSize: '0.9rem' }}>Your inbox is currently clear of matching message logs.</p>
              </div>
            ) : (
              <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(140, 29, 54, 0.3)', borderBottom: '1px solid rgba(224, 169, 109, 0.2)' }}>
                      <th style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: '#E0A96D', textTransform: 'uppercase' }}>Sender</th>
                      <th style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: '#E0A96D', textTransform: 'uppercase' }}>Subject</th>
                      <th style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: '#E0A96D', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: '#E0A96D', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: '#E0A96D', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMessages.map((m) => (
                      <tr 
                        key={m.id}
                        style={{ borderBottom: '1px solid rgba(224, 169, 109, 0.1)', backgroundColor: m.read ? 'transparent' : 'rgba(140, 29, 54, 0.1)' }}
                      >
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <div style={{ fontWeight: 600, color: '#F9F6F0', fontSize: '0.92rem' }}>{m.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#7A696F' }}>{m.email}</div>
                        </td>
                        <td style={{ padding: '1rem 1.2rem', fontSize: '0.9rem', color: '#B3A4A9' }}>{m.subject || 'No Subject'}</td>
                        <td style={{ padding: '1rem 1.2rem', fontSize: '0.82rem', color: '#7A696F' }}>{new Date(m.date).toLocaleDateString()}</td>
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '10px', backgroundColor: m.read ? 'rgba(255,255,255,0.08)' : 'rgba(224, 169, 109, 0.25)', color: m.read ? '#7A696F' : '#E0A96D' }}>
                            {m.read ? 'READ' : 'UNREAD'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => setSelectedMessage(m)} className="btn btn-secondary" style={{ padding: '0.4rem 0.7rem', fontSize: '0.78rem' }}>
                              👁️ View
                            </button>
                            <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Portfolio Inquiry')}`} className="btn btn-primary" style={{ padding: '0.4rem 0.7rem', fontSize: '0.78rem', textDecoration: 'none' }}>
                              ✉️ Reply
                            </a>
                            <button onClick={() => handleDeleteMessage(m.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.7rem', fontSize: '0.78rem', color: '#E0A899' }}>
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalMessagePages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                {Array.from({ length: totalMessagePages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMessagePage(i + 1)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(224, 169, 109, 0.2)',
                      backgroundColor: messagePage === i + 1 ? 'rgba(140, 29, 54, 0.6)' : 'rgba(7, 3, 5, 0.6)',
                      color: '#F9F6F0',
                      cursor: 'pointer'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= 5. ADMIN PROFILE ================= */}
        {activeTab === 'profile' && (
          <div>
            <h2 style={pageHeader}>Admin Profile Settings</h2>
            <p style={{ fontSize: '0.9rem', color: '#B3A4A9', marginBottom: '2rem' }}>Update administrative profile details, avatar URL, and security passcodes.</p>

            <form onSubmit={handleSaveProfile} style={{ ...cardStyle, maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                <img 
                  src={profileForm.avatar} 
                  alt="Avatar Preview" 
                  style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #E0A96D', objectFit: 'cover' }} 
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#F9F6F0', fontSize: '1.1rem' }}>{profileForm.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#E0A96D' }}>{profileForm.email}</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.4rem' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  style={fieldInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.4rem' }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  style={fieldInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.4rem' }}>Avatar Image Path / URL</label>
                <input
                  type="text"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  style={fieldInputStyle}
                  placeholder="e.g., /ai_researcher_portrait.png"
                />
              </div>

              <div style={{ borderTop: '1px solid rgba(224, 169, 109, 0.15)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#F9F6F0', marginBottom: '1rem' }}>Security Passcode</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#B3A4A9', marginBottom: '0.3rem' }}>New Passcode</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={profileForm.newPassword}
                      onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                      style={fieldInputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#B3A4A9', marginBottom: '0.3rem' }}>Confirm New Passcode</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={profileForm.confirmPassword}
                      onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                      style={fieldInputStyle}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', width: '100%', marginTop: '1rem' }}>
                Save Profile &amp; Passcode Settings
              </button>
            </form>
          </div>
        )}

      </main>

      {/* --- ADD / EDIT PROJECT MODAL --- */}
      {projectModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9980, backgroundColor: 'rgba(7, 3, 5, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', overflowY: 'auto' }}>
          <div style={{ ...cardStyle, maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', color: '#F9F6F0', marginBottom: '1.5rem' }}>
              {projectModal.mode === 'add' ? '➕ Deploy New Project' : '✏️ Edit Project'}
            </h3>

            <form onSubmit={handleSaveProjectForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectModal.data.title}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, title: e.target.value } })}
                  style={fieldInputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Category</label>
                  <select
                    value={projectModal.data.category}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, category: e.target.value } })}
                    style={fieldInputStyle}
                  >
                    <option value="AI Projects">AI Projects</option>
                    <option value="Web Applications">Web Applications</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="IoT Projects">IoT Projects</option>
                    <option value="Research Projects">Research Projects</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Project Date</label>
                  <input
                    type="date"
                    value={projectModal.data.date}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, date: e.target.value } })}
                    style={fieldInputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  placeholder="e.g. Python, PyTorch, React, OpenCV"
                  value={projectModal.data.tech}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, tech: e.target.value } })}
                  style={fieldInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Short Summary *</label>
                <input
                  type="text"
                  required
                  value={projectModal.data.desc}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, desc: e.target.value } })}
                  style={fieldInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Full Description / Case Study Findings</label>
                <textarea
                  rows="4"
                  value={projectModal.data.fullDesc}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, fullDesc: e.target.value } })}
                  style={{ ...fieldInputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#B3A4A9', marginBottom: '0.3rem' }}>GitHub URL</label>
                  <input
                    type="text"
                    value={projectModal.data.github}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, github: e.target.value } })}
                    style={fieldInputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#B3A4A9', marginBottom: '0.3rem' }}>Live Demo URL</label>
                  <input
                    type="text"
                    value={projectModal.data.demo}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, demo: e.target.value } })}
                    style={fieldInputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#B3A4A9', marginBottom: '0.3rem' }}>Figma URL (Optional)</label>
                  <input
                    type="text"
                    value={projectModal.data.figma}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, figma: e.target.value } })}
                    style={fieldInputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Project Cover Image URL</label>
                <input
                  type="text"
                  placeholder="e.g. https://... or /ai_researcher_portrait.png"
                  value={projectModal.data.image || ''}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, image: e.target.value } })}
                  style={fieldInputStyle}
                />
                {projectModal.data.image && (
                  <div style={{ marginTop: '0.6rem', width: '100%', maxHeight: '160px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(224, 169, 109, 0.3)' }}>
                    <img src={projectModal.data.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              {/* Status & Featured Toggles */}
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', paddingTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#F9F6F0' }}>
                  <input
                    type="checkbox"
                    checked={projectModal.data.status === 'published'}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, status: e.target.checked ? 'published' : 'draft' } })}
                  />
                  Published (Publicly Visible)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#D4AF37' }}>
                  <input
                    type="checkbox"
                    checked={projectModal.data.featured}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, featured: e.target.checked } })}
                  />
                  Featured Project ★
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setProjectModal({ isOpen: false, mode: 'add', data: null })} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT EXPERIENCE MODAL --- */}
      {experienceModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9980, backgroundColor: 'rgba(7, 3, 5, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', overflowY: 'auto' }}>
          <div style={{ ...cardStyle, maxWidth: '580px', width: '100%' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', color: '#F9F6F0', marginBottom: '1.5rem' }}>
              {experienceModal.mode === 'add' ? '➕ Add Experience Item' : '✏️ Edit Experience Item'}
            </h3>

            <form onSubmit={handleSaveExperienceForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Category</label>
                  <select
                    value={experienceModal.data.category}
                    onChange={(e) => setExperienceModal({ ...experienceModal, data: { ...experienceModal.data, category: e.target.value } })}
                    style={fieldInputStyle}
                  >
                    <option value="Education">Education</option>
                    <option value="Experience">Experience</option>
                    <option value="Organizations">Organizations</option>
                    <option value="Certifications">Certifications</option>
                    <option value="Achievements">Achievements</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Date Range / Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024 - Present"
                    value={experienceModal.data.date}
                    onChange={(e) => setExperienceModal({ ...experienceModal, data: { ...experienceModal.data, date: e.target.value } })}
                    style={fieldInputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Role / Degree Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Web Developer (Research Intern)"
                  value={experienceModal.data.title}
                  onChange={(e) => setExperienceModal({ ...experienceModal, data: { ...experienceModal.data, title: e.target.value } })}
                  style={fieldInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Organization / Institution Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. President University"
                  value={experienceModal.data.subtitle}
                  onChange={(e) => setExperienceModal({ ...experienceModal, data: { ...experienceModal.data, subtitle: e.target.value } })}
                  style={fieldInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Description &amp; Key Accomplishments</label>
                <textarea
                  rows="4"
                  value={experienceModal.data.desc}
                  onChange={(e) => setExperienceModal({ ...experienceModal, data: { ...experienceModal.data, desc: e.target.value } })}
                  style={{ ...fieldInputStyle, resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#F9F6F0', marginBottom: '0.3rem' }}>Photo / Certificate Image URL</label>
                <input
                  type="text"
                  placeholder="e.g. https://... or /ai_researcher_portrait.png"
                  value={experienceModal.data.image || ''}
                  onChange={(e) => setExperienceModal({ ...experienceModal, data: { ...experienceModal.data, image: e.target.value } })}
                  style={fieldInputStyle}
                />
                {experienceModal.data.image && (
                  <div style={{ marginTop: '0.6rem', width: '100%', maxHeight: '150px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(224, 169, 109, 0.3)' }}>
                    <img src={experienceModal.data.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setExperienceModal({ isOpen: false, mode: 'add', data: null })} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Experience Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MESSAGE DETAIL MODAL --- */}
      {selectedMessage && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9980, backgroundColor: 'rgba(7, 3, 5, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ ...cardStyle, maxWidth: '580px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(224, 169, 109, 0.2)', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', color: '#F9F6F0' }}>{selectedMessage.name}</h3>
                <div style={{ fontSize: '0.85rem', color: '#E0A96D' }}>{selectedMessage.email}</div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7A696F' }}>{new Date(selectedMessage.date).toLocaleString()}</div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#7A696F', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Subject</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F9F6F0' }}>{selectedMessage.subject || 'No Subject Provided'}</div>
            </div>

            <div style={{ backgroundColor: 'rgba(7, 3, 5, 0.8)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(224, 169, 109, 0.15)', marginBottom: '2rem', lineHeight: 1.6, color: '#E6D7DC', fontSize: '0.95rem' }}>
              {selectedMessage.message}
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button 
                onClick={() => { toggleMessageRead(selectedMessage.id); setSelectedMessage({ ...selectedMessage, read: !selectedMessage.read }); }} 
                className="btn btn-secondary" 
                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
              >
                {selectedMessage.read ? 'Mark as Unread' : 'Mark as Read'}
              </button>
              <a 
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`} 
                className="btn btn-primary" 
                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                ✉️ Reply via Email
              </a>
              <button 
                onClick={() => handleDeleteMessage(selectedMessage.id)} 
                className="btn btn-secondary" 
                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#E0A899', borderColor: 'rgba(140, 29, 54, 0.5)' }}
              >
                🗑️ Delete
              </button>
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="btn btn-secondary" 
                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
