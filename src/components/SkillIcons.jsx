import React from 'react';

export default function SkillIcon({ name, isSelected }) {
  const iconColor = isSelected ? "#F9F6F0" : "#E0A96D";

  const renderIcon = () => {
    switch (name) {
      case "Artificial Intelligence":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="15" x2="8" y2="17" />
            <line x1="16" y1="15" x2="16" y2="17" />
          </svg>
        );
      case "Machine Learning":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a9 9 0 0 1 9 9c0 3.6-2.1 6.7-5.2 8.1-.4.2-.8.8-.8 1.4V22h-6v-1.5c0-.6-.4-1.2-.8-1.4A9.01 9.01 0 0 1 3 11a9 9 0 0 1 9-9z" />
            <circle cx="9" cy="9" r="1" fill={iconColor} />
            <circle cx="15" cy="9" r="1" fill={iconColor} />
            <path d="M9.5 14a3.5 3.5 0 0 0 5 0" />
          </svg>
        );
      case "Computer Vision":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case "OpenCV":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        );
      case "TensorFlow":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        );
      case "PyTorch":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
          </svg>
        );
      case "HTML":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
        );
      case "CSS":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 0 0 20z" fill={iconColor} opacity="0.3" />
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          </svg>
        );
      case "JavaScript":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case "React":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8">
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill={iconColor} />
          </svg>
        );
      case "UI/UX Design":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 22L22 2" />
            <path d="M13 6l3 3" />
            <path d="M3 21l3-1 12-12-2-2L4 18l-1 3z" />
            <rect x="15" y="3" width="6" height="6" rx="1" />
          </svg>
        );
      case "Python":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.9 2c-3.8 0-3.6 1.6-3.6 1.6v1.7h3.7v.5H6.8S4.5 5.5 4.5 9.4c0 3.8 2 3.7 2 3.7h1.2V11.5s-.1-1.9 1.9-1.9h3.7s1.8 0 1.8-1.8V4c.1 0 .6-2-3.2-2z" />
            <circle cx="9.2" cy="4.2" r="0.6" fill={iconColor} />
            <path d="M12.1 22c3.8 0 3.6-1.6 3.6-1.6v-1.7h-3.7v-.5h5.2s2.3.3 2.3-3.6c0-3.8-2-3.7-2-3.7h-1.2v1.6s.1 1.9-1.9 1.9h-3.7s-1.8 0-1.8 1.8V20c-.1 0-.6 2 3.2 2z" />
            <circle cx="14.8" cy="19.8" r="0.6" fill={iconColor} />
          </svg>
        );
      case "PHP":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="3" />
            <path d="M6 10v4M6 10h2a1.5 1.5 0 0 0 0-3H6" />
            <path d="M12 9v6M12 12h2" />
            <path d="M17 10v4M17 10h2a1.5 1.5 0 0 0 0-3h-2" />
          </svg>
        );
      case "Node.js":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        );
      case "MySQL":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case "Firebase":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
          </svg>
        );
      case "Git":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M6 9v6" />
            <path d="M9 6h4a4 4 0 0 1 4 4v5" />
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
    }
  };

  return (
    <div className={`hexagon-icon-box ${isSelected ? 'selected' : ''}`}>
      {renderIcon()}
    </div>
  );
}
