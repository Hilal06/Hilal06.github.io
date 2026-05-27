# Hilal06 Portfolio 🚀

A highly interactive, cinematic, and premium portfolio website built with **Svelte**, **Vite**, and **Tailwind CSS**. Designed to showcase projects, skills, and contact information with smooth animations and an immersive user experience.

## ✨ Features

- **Cinematic Hero Section:** Features dynamic typography, smooth loading animations, and a glowing orb effect for a premium feel.
- **Interactive Project Showcase:** 
  - Displays projects using a combination of local JSON data and live GitHub API integration.
  - Immersive Project Modals with interactive image galleries and feature breakdowns.
  - Public/Private repository status indicators.
- **Infinite Skills Marquee:** A sleek, continuously scrolling ticker tape displaying core technologies using high-quality SVG devicons.
- **Smooth Scrolling:** Powered by [Lenis](https://lenis.studiofreight.com/) and GSAP for a buttery-smooth navigation experience.
- **Working Contact Form:** Integrated with [Web3Forms](https://web3forms.com/) for direct messaging without a backend.
- **Fully Responsive:** Optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Framework:** [Svelte](https://svelte.dev/) (with TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) & native CSS transitions
- **Smooth Scroll:** [Lenis](https://github.com/studio-freight/lenis)
- **Form Handling:** [Web3Forms](https://web3forms.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hilal06/Hilal06.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Hilal06.github.io
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the site.

## 📁 Project Structure

- `src/components/`: Contains all Svelte UI components (Hero, Projects, SkillsMarquee, Contact, etc.)
- `src/data/`: Contains `projects.json` for managing project details, features, and gallery images.
- `src/lib/`: Contains utility functions, including the `github.ts` API fetcher.
- `src/App.svelte`: The main application orchestrator linking components and handling state.

## ⚙️ Customization

- **Updating Projects:** Edit the `src/data/projects.json` file. You can add multiple images to the `images` array for each project to utilize the modal gallery feature.
- **Changing GitHub User:** Update the GitHub username parameter in `src/App.svelte` where `getProfile()` and `getRepos()` are called.
- **Contact Form:** Replace the `ACCESS_KEY` in `src/components/Contact.svelte` with your own Web3Forms access key to receive emails.
- **Theme Colors:** The brand color palette and surface colors are defined in `src/app.css` under the `@theme` block. Modify these hex codes to completely change the site's aesthetic.

## 📄 License

This project is open-source and available under the MIT License.
