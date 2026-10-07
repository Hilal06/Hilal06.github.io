# 🏛️ Rifaul Hilal S — Software Engineer Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-hilal06.github.io-d94e28?style=for-the-badge&logo=github&logoColor=white)](https://hilal06.github.io)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.0_Runes-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

An architectural, developer-focused portfolio website engineered with **Svelte 5 (Runes)**, **Vite 8**, and **Tailwind CSS v4**. Crafted with the **Stratum Architectural Aesthetic** — featuring warm canvas tones, terracotta accents, brutalist sharp borders, and technical blueprint detailing. Tailored for **Backend, Systems, Native Android (Kotlin), and IoT Engineering** showcases.

---

## 🌐 Live Demo

👉 **[https://hilal06.github.io](https://hilal06.github.io)**

---

## ✨ Architectural Highlights & Features

- **⚡ Svelte 5 Runes Architecture:** Built exclusively with Svelte 5 reactive primitives (`$state`, `$derived`, `$effect`, `$props`) for clean and performant state handling.
- **🏛️ Stratum Architectural Design System:**
  - Warm stone palette (`#e8e5de` canvas, `#f2efe9` surfaces) paired with terracotta (`#d94e28`) precision accents.
  - Brutalist sharp corners (`rounded-none`, 0px border-radius) and blueprint developer grid texturing.
  - Dual-tone typography pairing **Outfit** and **JetBrains Mono**.
- **💻 UNIX-Inspired Terminal Widgets:**
  - **Hero Terminal:** Interactive `CONFIG // hilal.config.ts` console displaying live branch status (`main*`), weekly commit activity indicators, and developer telemetry.
  - **Contact Dispatch Terminal:** Command-line styled form (`~/bin/dispatch-msg.sh`) with status beacon and styled prompt lines.
- **🌐 Bilingual i18n Engine (EN / ID):** One-click language switching between English and Indonesian with persistent `localStorage` preference.
- **📁 Structured Portfolio Case Studies:**
  - Domain-based segmented filtering (*All*, *Android & Mobile*, *Full Stack*, *IoT & Embedded*, *Open Source*).
  - Two-column technical modal dialog with image galleries, zoom preview, and Lenis scroll containment.
  - **Architectural Schematic Fallback:** Graceful blueprint wireframe view with technical metadata for headless CLI projects or repositories without visual assets.
- **💼 Interactive Resume Modal:** In-app CV preview modal with integrated download affordance.
- **🔄 Live GitHub REST API Integration:** Dynamic repository and profile metadata fetching with automated offline fallback.
- **✉️ Direct Dispatch Contact:** Powered by [Web3Forms](https://web3forms.com/) with quick clipboard email copy helper.

---

## 🛠️ Technical Ecosystem & Stack

| Domain | Primary Technologies |
| :--- | :--- |
| **Backend & Systems** | Laravel, Node.js, Go, Python, Supabase, PostgreSQL, MySQL, REST APIs, Redis, Docker |
| **Mobile Native** | Kotlin, Jetpack Compose (M3), Room SQLite DB, Android SDK, Coroutines & Flow |
| **IoT & Embedded** | ESP32 / ESP8266, Arduino C++, MQTT, LittleFS, WebSockets |
| **DevOps & Linux** | Docker, Fedora / Ubuntu Linux, Bash Automation, Charm Gum TUI, Git |
| **Frontend & UI** | Svelte 5, TypeScript, Tailwind CSS v4, GSAP 3, Lenis Scroll, Vite 8 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0 or higher
- **npm** / **pnpm** / **yarn**

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hilal06/Hilal06.github.io.git
   cd Hilal06.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Run type checks:**
   ```bash
   npm run check
   ```

5. **Create production build:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
Hilal06.github.io/
├── public/
│   ├── avatar.jpg              # Profile visual asset
│   ├── resume.pdf              # Curriculum Vitae PDF
│   └── projects/               # Project screenshots & gallery assets
├── src/
│   ├── components/
│   │   ├── About.svelte        # Experience & architectural dossier
│   │   ├── Contact.svelte      # Terminal dispatch contact form
│   │   ├── Footer.svelte       # Colophon & external links
│   │   ├── GlowOrb.svelte      # Ambient lighting micro-element
│   │   ├── Hero.svelte         # Primary introduction & terminal docket
│   │   ├── LoadingScreen.svelte # Initial architectural loader
│   │   ├── Navbar.svelte       # Top navigation & i18n controller
│   │   ├── ProjectModal.svelte # Case study dialog & gallery
│   │   ├── Projects.svelte     # Project list with schematic fallback
│   │   ├── ResumeModal.svelte  # CV preview dialog
│   │   └── SkillsMarquee.svelte# Tech stack ticker
│   ├── data/
│   │   ├── profile.json        # Bio and profile data
│   │   └── projects.json       # Case study details and metadata
│   ├── lib/
│   │   ├── actions.ts          # GSAP & magnetic interaction directives
│   │   ├── github.ts           # GitHub REST API client
│   │   ├── i18n.ts             # Bilingual translation store (EN/ID)
│   │   ├── theme.svelte.ts     # Stratum theme state
│   │   └── types.ts            # TypeScript definitions
│   ├── app.css                 # Tailwind CSS v4 @theme design tokens
│   ├── App.svelte              # Main portfolio application root
│   └── main.ts                 # Svelte 5 mounting entry
├── index.html                  # HTML entry point
├── package.json
└── vite.config.ts              # Vite 8 configuration
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
