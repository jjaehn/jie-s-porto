<div align="center">

  <!-- Hero Banner Placeholder -->
  <img src="https://via.placeholder.com/1200x400/312E81/EEF2FF?text=Personal+Portfolio+Website+%2B+Custom+Admin+CMS" alt="Portfolio Banner" width="100%" />

  # 💼 Personal Portfolio Website & Admin CMS

  [![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
  [![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Build_Tool-Vite-646CFF.svg?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28.svg?logo=firebase)](https://firebase.google.com/)

  <p align="center">
    A modern, glassmorphic portfolio web application designed for high performance, featuring an integrated admin CMS dashboard to dynamically manage projects, skill analytics, and incoming contact inquiries.
  </p>

</div>

---

## 📌 Project Overview

This repository powers **Jihan Azaria Bibi's** personal developer portfolio website ([https://jihanazariaa.vercel.app/](https://jihanazariaa.vercel.app/)). Built with **React 18**, **Vite**, **Tailwind CSS**, and **Firebase**, this application combines sleek dark-mode aesthetic design with a secure, password-protected Admin Dashboard. 

Rather than editing hardcoded JSON files to update portfolio content, the admin panel allows seamless CRUD management of featured projects, tech stack categories, experience timelines, and visitor messages in real-time.

---

## ✨ Key Features

- 🎨 **Modern Dark-Mode Design:** Glassmorphism UI, smooth scroll animations, curated color palettes, and responsive layouts.
- 🛠️ **Custom Admin CMS Dashboard:** Secure authentication panel allowing the owner to add, edit, or feature projects without redeploying code.
- 📂 **Interactive Project Gallery:** Categorized project cards with tech badges, live demo links, GitHub source buttons, and modal detail views.
- 📊 **Dynamic Skill Progress Visualizer:** Interactive tech stack showcase categorized into AI/ML, Full Stack, Languages, and Hardware.
- 📩 **Contact Form with Firebase Integration:** Direct visitor message delivery with real-time notifications in the admin console.
- ⚡ **Lightning Fast Performance:** Optimized asset bundles with Vite and seamless deployment via Vercel/Netlify.

---

## 🛠️ Tech Stack

| Domain | Tech Stack |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion |
| **Backend / BaaS** | Firebase Authentication, Cloud Firestore, Firebase Storage |
| **Hosting & CI/CD** | Vercel / Netlify with GitHub automatic deployments |
| **Code Quality** | ESLint, Prettier, PostCSS |

---

## 🏗️ Architecture Diagram

```mermaid
graph LR
    Visitor[Public Visitor] -->|Read Projects & Send Message| ReactApp[React Single Page App]
    Admin[Portfolio Owner] -->|Firebase Auth Login| AdminCMS[Protected Admin Dashboard]
    AdminCMS -->|Create / Update / Delete Projects| Firestore[(Cloud Firestore DB)]
    AdminCMS -->|Upload Media / Thumbnails| Storage[(Firebase Storage Disk)]
    ReactApp -->|Fetch Dynamic Data| Firestore
```

---

## 🖼️ User Interface Screenshots

<div align="center">

| Public Hero Section | Interactive Projects Section | Protected Admin CMS |
| :---: | :---: | :---: |
| `<img src="https://via.placeholder.com/300x200/4338ca/FFFFFF?text=Portfolio+Hero+UI" />` | `<img src="https://via.placeholder.com/300x200/4338ca/FFFFFF?text=Project+Cards+Grid" />` | `<img src="https://via.placeholder.com/300x200/4338ca/FFFFFF?text=Admin+CMS+Dashboard" />` |

</div>

---

## 📁 Folder Structure

```text
jie-s-porto/
├── public/                    # Static assets & favicons
├── src/
│   ├── assets/                # Logos, SVG icons, background images
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Navigation bar with dark mode toggle
│   │   ├── ProjectCard.jsx    # Glassmorphic project item
│   │   └── ProtectedRoute.jsx # Auth wrapper for Admin pages
│   ├── pages/
│   │   ├── Home.jsx           # Public Portfolio landing page
│   │   └── AdminDashboard.jsx # CMS for managing content
│   ├── services/
│   │   └── firebase.js        # Firebase SDK initialization
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── README.md
```

---

## 🚀 Installation & Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/jjaehn/jie-s-porto.git
cd jie-s-porto
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase Environment Variables
Create a `.env` file in the root folder:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start Local Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔮 Future Enhancements

- [ ] Add Blog / Tech Notes section with Markdown parser.
- [ ] Add visitor traffic analytics visualization inside the Admin CMS.
- [ ] Integrate GitHub GraphQL API to automatically fetch live commit counts and star metrics.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 👤 Author

**Jihan Azaria Bibi**  
- GitHub: [@jjaehn](https://github.com/jjaehn)  
- LinkedIn: [Jihan Azaria Bibi](https://www.linkedin.com/in/jihanazariabibi)  
- Website: [jihanazariaa.vercel.app](https://jihanazariaa.vercel.app/)  
- Email: [azariajihan36@gmail.com](mailto:azariajihan36@gmail.com)
