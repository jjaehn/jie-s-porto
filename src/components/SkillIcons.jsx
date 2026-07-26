import React from 'react';

export default function SkillIcon({ name, isSelected }) {
  const iconColor = isSelected ? "#F9F6F0" : "#E0A96D";

  const renderIcon = () => {
    const cleanName = name ? name.toLowerCase() : '';

    if (cleanName.includes('ai') || cleanName.includes('artificial intelligence')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="15" x2="8" y2="17" />
          <line x1="16" y1="15" x2="16" y2="17" />
        </svg>
      );
    } else if (cleanName.includes('machine learning') || cleanName.includes('scikit')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9 9 0 0 1 9 9c0 3.6-2.1 6.7-5.2 8.1-.4.2-.8.8-.8 1.4V22h-6v-1.5c0-.6-.4-1.2-.8-1.4A9.01 9.01 0 0 1 3 11a9 9 0 0 1 9-9z" />
          <circle cx="9" cy="9" r="1" fill={iconColor} />
          <circle cx="15" cy="9" r="1" fill={iconColor} />
        </svg>
      );
    } else if (cleanName.includes('deep learning') || cleanName.includes('keras') || cleanName.includes('tensorflow') || cleanName.includes('pytorch')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    } else if (cleanName.includes('vision') || cleanName.includes('opencv') || cleanName.includes('roboflow')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    } else if (cleanName.includes('nlp') || cleanName.includes('natural language') || cleanName.includes('nltk') || cleanName.includes('gensim')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    } else if (cleanName.includes('html') || cleanName.includes('css') || cleanName.includes('tailwind') || cleanName.includes('bootstrap')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    } else if (cleanName.includes('react') || cleanName.includes('javascript')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill={iconColor} />
        </svg>
      );
    } else if (cleanName.includes('responsive') || cleanName.includes('android')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    } else if (cleanName.includes('ui/ux') || cleanName.includes('figma') || cleanName.includes('canva') || cleanName.includes('blender')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    } else if (cleanName.includes('python')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.9 2c-3.8 0-3.6 1.6-3.6 1.6v1.7h3.7v.5H6.8S4.5 5.5 4.5 9.4c0 3.8 2 3.7 2 3.7h1.2V11.5s-.1-1.9 1.9-1.9h3.7s1.8 0 1.8-1.8V4c.1 0 .6-2-3.2-2z" />
        </svg>
      );
    } else if (cleanName.includes('node') || cleanName.includes('php') || cleanName.includes('mysql') || cleanName.includes('database')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    } else if (cleanName.includes('firebase')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
        </svg>
      );
    } else if (cleanName.includes('git') || cleanName.includes('github')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
          <path d="M9 6h4a4 4 0 0 1 4 4v5" />
        </svg>
      );
    } else if (cleanName.includes('api') || cleanName.includes('postman') || cleanName.includes('rest')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    } else if (cleanName.includes('auth') || cleanName.includes('code') || cleanName.includes('colab')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    } else {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
