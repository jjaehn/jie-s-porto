import React, { useState, useEffect } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';

export default function App() {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [globalState, setGlobalState] = useState({
    studentName: 'Jihan Azaria Bibi',
    projects: []
  });

  // Handle client-side hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '') || '/';
      setPath(currentHash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize and load global portfolio state from localStorage
  useEffect(() => {
    let storedName = localStorage.getItem('lab_student_name');
    if (!storedName || storedName === 'Aiden Vance' || storedName === 'JIhan Azaria Bibi') {
      storedName = 'Jihan Azaria Bibi';
      localStorage.setItem('lab_student_name', 'Jihan Azaria Bibi');
    }
    
    // Default projects if none exist
    const defaultProjects = [
      {
        id: "smart-safe",
        title: "Smart Safe Lockbox",
        category: "Computer Vision",
        tech: ["Python", "OpenCV", "YOLO", "Raspberry Pi"],
        desc: "An intelligent security safe integrating facial verification and anomaly object detection to permit access and trigger alerts.",
        span: "span 8",
        github: "https://github.com",
        demo: "https://demo.com",
        caseStudy: "Designed a multi-modal security box that logs face descriptors. Features a fallback passcode. Achieved 99.2% face detection accuracy under dim lab lighting."
      },
      {
        id: "currency-detection",
        title: "Real-Time Currency Classifier",
        category: "Deep Learning",
        tech: ["PyTorch", "MobileNetV3", "CoreML", "Swift"],
        desc: "Mobile device pipeline classifying and validating currencies on-device for visually impaired laboratory assistants.",
        span: "span 4",
        github: "https://github.com",
        demo: "https://demo.com",
        caseStudy: "Optimized a MobileNet model for iOS. Compressed weight tensors to 8MB. Integrated real-time voice feedback using AVFoundation speech engine."
      },
      {
        id: "face-emotion",
        title: "Face Emotion Recognition",
        category: "Computer Vision",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
        desc: "Analyzes video frames to predict 7 emotion levels, logging engagement metrics in real-time user-testing laboratory screens.",
        span: "span 4",
        github: "https://github.com",
        demo: "https://demo.com",
        caseStudy: "Trained a custom CNN on FER2013. Implemented a landmark face mesh tracking 468 points. Outputs real-time engagement reports via websocket."
      },
      {
        id: "pm-system",
        title: "AI-Driven PM System",
        category: "Web App",
        tech: ["React", "Firebase", "Node.js", "SQL"],
        desc: "Project management system predicting task bottlenecks and suggesting timeline changes based on historic developer speed.",
        span: "span 4",
        github: "https://github.com",
        demo: "https://demo.com",
        caseStudy: "Designed a relational database layout mapping developer task intervals. Built a random forest estimator in Python serving JSON predictions to React dashboard."
      },
      {
        id: "ai-chatbot",
        title: "Neural Lab Assistant",
        category: "NLP",
        tech: ["Python", "LangChain", "LLaMA-3", "ChromaDB"],
        desc: "Retrieval-Augmented Chatbot parsing laboratory documentation files and serving immediate configuration procedures.",
        span: "span 4",
        github: "https://github.com",
        demo: "https://demo.com",
        caseStudy: "Ingested 400 pages of laboratory user guides into Chroma vector database. Used LangChain to resolve system queries using LLaMA models locally."
      },
      {
        id: "spam-detection",
        title: "Vectorized Email Spam Filter",
        category: "NLP",
        tech: ["Python", "Scikit-Learn", "TF-IDF", "FastAPI"],
        desc: "High-speed API filtering network packets, using vector algorithms to isolate phishing attempts before landing.",
        span: "span 12",
        github: "https://github.com",
        demo: "https://demo.com",
        caseStudy: "Extracted feature matrices from raw headers. Implemented an SVM model in Scikit-Learn. Deployed as a microservice processing requests under 8ms."
      }
    ];

    const storedProjects = JSON.parse(localStorage.getItem('lab_projects'));
    
    if (!storedProjects || storedProjects.length === 0) {
      localStorage.setItem('lab_projects', JSON.stringify(defaultProjects));
      setGlobalState({
        studentName: storedName,
        projects: defaultProjects
      });
    } else {
      // Re-hydrate the cover visuals
      const hydrated = storedProjects.map(proj => {
        // Pre-build default preview graphics if missing
        if (!proj.preview) {
          proj.preview = (
            <div className="portfolio-preview safe-preview">
              <div className="safe-status">DEPLOYED</div>
            </div>
          );
        }
        return proj;
      });
      setGlobalState({
        studentName: storedName,
        projects: hydrated
      });
    }

    // Check session auth on load
    const isAuth = sessionStorage.getItem('lab_admin_auth') === 'true';
    setIsAdminAuthenticated(isAuth);
  }, []);

  const updateGlobalState = (key, value) => {
    setGlobalState(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'studentName') {
        localStorage.setItem('lab_student_name', value);
      } else if (key === 'projects') {
        localStorage.setItem('lab_projects', JSON.stringify(value));
      }
      return next;
    });
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('lab_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('lab_admin_auth');
    setPath('/');
    window.history.pushState(null, '', '#/');
  };

  return (
    <>
      {/* Premium Laboratory Canvas Background */}
      <BackgroundEffect />

      {/* Floating navigation system */}
      {path !== '/admin' && <Navbar currentPath={path} setPath={setPath} />}

      {/* Main Routing Gateway */}
      {path === '/admin' ? (
        isAdminAuthenticated ? (
          <Dashboard 
            onLogout={handleLogout} 
            globalState={globalState} 
            updateGlobalState={updateGlobalState} 
          />
        ) : (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onCancel={() => { setPath('/'); window.history.pushState(null, '', '#/'); }} 
          />
        )
      ) : (
        <>
          <Hero studentName={globalState.studentName} />
          <About />
          <Skills />
          {/* Custom portfolio displaying bento items */}
          <Portfolio onCaseStudySelect={(proj) => setSelectedCaseStudy(proj)} />
          <Resume />
          <Contact />
          <Footer studentName={globalState.studentName} />

          {/* Detailed case study inspector popup */}
          {selectedCaseStudy && (
            <CaseStudyModal 
              project={selectedCaseStudy} 
              onClose={() => setSelectedCaseStudy(null)} 
            />
          )}
        </>
      )}
    </>
  );
}
