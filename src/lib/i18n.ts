import { writable, derived } from 'svelte/store';

export type Language = 'en' | 'id';

const getInitialLang = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio_lang') as Language;
    if (saved === 'en' || saved === 'id') return saved;
  }
  return 'en';
};

export const currentLang = writable<Language>(getInitialLang());

export function setLanguage(lang: Language) {
  currentLang.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_lang', lang);
  }
}

export const translations = {
  en: {
    // Navbar
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',

    // Hero
    'hero.statusPing': 'Available for Full-time & Remote Roles',
    'hero.greeting': "Hi, I'm ",
    'hero.bio': 'I am a Back-End and IoT Developer with a strong foundation in Informatics Engineering. I specialize in bridging the gap between hardware and software, leveraging technologies like Laravel, Svelte, Kotlin, and ESP32 to build deploy-ready platforms.',
    'hero.locationLabel': 'Location',
    'hero.locationValue': 'East Java, ID (Remote Ready)',
    'hero.degreeLabel': 'Degree',
    'hero.degreeValue': 'Informatics Engineering B.S.',
    'hero.specialtyLabel': 'Specialty',
    'hero.specialtyValue': 'Full-Stack, Native Android & IoT',
    'hero.viewResume': 'View / Download Resume',
    'hero.exploreProjects': 'Explore Projects',
    'hero.scroll': 'Scroll',
    'hero.verifiedDev': 'Verified Dev',
    'hero.terminalTitle': 'Backend & IoT Developer',
    'hero.terminalStatus': '🟢 Open to Offers',

    // About
    'about.subtitle': 'About Me',
    'about.title': 'Background & Technical Stack',
    'about.philosophyTitle': 'Engineering Philosophy',
    'about.philosophyBody': 'I am an Informatics Engineering graduate dedicated to building robust Web Back-End systems and innovative IoT solutions. My engineering philosophy centers on a hands-on, builder approach, whether I am developing full-stack web applications using Laravel and Svelte, or designing custom IoT architectures with ESP32 microcontrollers, Node-RED, and Grafana. Through internships at multinational companies, I gained valuable experience in API integration and backend server development.',
    'about.highlights.eduBadge': 'Education',
    'about.highlights.eduTitle': 'Informatics Engineering Graduate',
    'about.highlights.eduSub': 'Solid academic foundation & hands-on engineering mindset',
    'about.highlights.expBadge': 'Experience',
    'about.highlights.expTitle': 'Multinational Company Internship',
    'about.highlights.expSub': 'Real-world experience in API integration & backend server development',
    'about.highlights.homeBadge': 'Homelab',
    'about.highlights.homeTitle': 'Microservices Homelab Manager',
    'about.highlights.homeSub': 'Self-hosted infrastructure using Docker & Ubuntu Server',
    'about.ecosystemTitle': 'Technical Ecosystem',
    'about.primaryLegend': 'Primary Core Tech',
    'about.toolsLegend': 'Ecosystem & Tools',

    // Categories
    'cat.backend': 'Backend & Cloud Services',
    'cat.mobile': 'Mobile Development (Android Native)',
    'cat.iot': 'IoT & Embedded Hardware',
    'cat.devops': 'DevOps, Linux & Automation',
    'cat.frontend': 'Frontend & Modern Web',

    // Projects
    'projects.subtitle': 'Projects',
    'projects.title': 'Selected Work',
    'projects.desc': 'Explore my featured web applications, open-source projects, and technical case studies.',
    'projects.viewDetails': 'View Details',
    'projects.loading': 'Loading Projects...',
    'projects.noProjects': 'No projects found for category',
    'projects.cat.all': 'All',
    'projects.cat.android': 'Android & Mobile',
    'projects.cat.fullstack': 'Full Stack',
    'projects.cat.iot': 'IoT & Embedded',
    'projects.cat.opensource': 'Open Source',

    // Project Modal
    'modal.overview': 'Overview',
    'modal.keyFeatures': 'Key Features',
    'modal.techStack': 'Tech Stack',
    'modal.publicRepo': 'Public Repo',
    'modal.privateRepo': 'Private Repo',
    'modal.viewRepo': 'View Repository',
    'modal.expandPreview': 'Click to Expand Preview',

    // Contact
    'contact.subtitle': 'Contact',
    'contact.title': "Let's Build Something Great Together",
    'contact.desc': 'Whether you have a job opportunity, a project proposal, or just want to connect, feel free to reach out!',
    'contact.copyEmail': 'Copy Email',
    'contact.copied': 'Copied!',
    'contact.nameLabel': 'Your Name',
    'contact.namePlaceholder': 'John Doe',
    'contact.emailLabel': 'Your Email',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.subjectLabel': 'Subject',
    'contact.subjectPlaceholder': 'Project Collaboration / Job Offer',
    'contact.messageLabel': 'Message',
    'contact.messagePlaceholder': 'Hi Hilal, I would like to discuss...',
    'contact.sendBtn': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.successMsg': 'Thank you! Your message has been sent successfully.',

    // Resume Modal
    'resume.title': 'Curriculum Vitae / Resume',
    'resume.download': 'Download PDF',
    
    // Footer
    'footer.builtWith': 'Engineered with Svelte 5 & Tailwind CSS v4',
    'footer.backToTop': 'Back to top'
  },

  id: {
    // Navbar
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',
    'nav.resume': 'Resume',

    // Hero
    'hero.statusPing': 'Tersedia untuk Peran Penuh Waktu & Remote',
    'hero.greeting': 'Halo, Saya ',
    'hero.bio': 'Saya seorang Pengembang Back-End dan IoT dengan fondasi kuat dalam Teknik Informatika. Saya berpengalaman menjembatani hardware dan software, mengadaptasi teknologi seperti Laravel, Svelte, Kotlin, dan ESP32 untuk membangun platform siap rilis.',
    'hero.locationLabel': 'Lokasi',
    'hero.locationValue': 'Jawa Timur, ID (Siap Remote)',
    'hero.degreeLabel': 'Pendidikan',
    'hero.degreeValue': 'S1 Teknik Informatika',
    'hero.specialtyLabel': 'Spesialisasi',
    'hero.specialtyValue': 'Full-Stack, Native Android & IoT',
    'hero.viewResume': 'Lihat / Unduh Resume',
    'hero.exploreProjects': 'Lihat Proyek',
    'hero.scroll': 'Gulir',
    'hero.verifiedDev': 'Dev Terverifikasi',
    'hero.terminalTitle': 'Pengembang Backend & IoT',
    'hero.terminalStatus': '🟢 Terbuka untuk Penawaran',

    // About
    'about.subtitle': 'Tentang Saya',
    'about.title': 'Latar Belakang & Ekosistem Teknis',
    'about.philosophyTitle': 'Filosofi Rekayasa',
    'about.philosophyBody': 'Saya seorang lulusan Teknik Informatika yang berdedikasi membangun sistem Web Back-End tangguh dan solusi IoT inovatif. Filosofi rekayasa saya berpusat pada pendekatan praktis (hands-on), baik saat mengoperasikan aplikasi web full-stack menggunakan Laravel dan Svelte, maupun merancang arsitektur IoT kustom dengan mikrokontroler ESP32, Node-RED, dan Grafana. Melalui pengalaman magang di perusahaan multinasional, saya memperdalam integrasi API dan server backend.',
    'about.highlights.eduBadge': 'Pendidikan',
    'about.highlights.eduTitle': 'Lulusan S1 Teknik Informatika',
    'about.highlights.eduSub': 'Fondasi akademik kuat & pola pikir rekayasa praktis',
    'about.highlights.expBadge': 'Pengalaman',
    'about.highlights.expTitle': 'Magang Perusahaan Multinasional',
    'about.highlights.expSub': 'Pengalaman dunia nyata dalam integrasi API & server backend',
    'about.highlights.homeBadge': 'Homelab',
    'about.highlights.homeTitle': 'Pengelola Microservices Homelab',
    'about.highlights.homeSub': 'Infrastruktur mandiri menggunakan Docker & Ubuntu Server',
    'about.ecosystemTitle': 'Ekosistem Teknis',
    'about.primaryLegend': 'Teknologi Utama',
    'about.toolsLegend': 'Alat & Ekosistem',

    // Categories
    'cat.backend': 'Layanan Backend & Cloud',
    'cat.mobile': 'Pengembangan Mobile (Android Native)',
    'cat.iot': 'Hardware IoT & Terbenam',
    'cat.devops': 'DevOps, Linux & Otomatisasi',
    'cat.frontend': 'Frontend & Web Modern',

    // Projects
    'projects.subtitle': 'Proyek',
    'projects.title': 'Karya Terpilih',
    'projects.desc': 'Jelajahi aplikasi web unggulan, proyek open-source, dan studi kasus teknis saya.',
    'projects.viewDetails': 'Lihat Detail',
    'projects.loading': 'Memuat Proyek...',
    'projects.noProjects': 'Tidak ada proyek ditemukan untuk kategori',
    'projects.cat.all': 'Semua',
    'projects.cat.android': 'Android & Mobile',
    'projects.cat.fullstack': 'Full Stack',
    'projects.cat.iot': 'IoT & Hardware',
    'projects.cat.opensource': 'Open Source',

    // Project Modal
    'modal.overview': 'Ringkasan',
    'modal.keyFeatures': 'Fitur Utama',
    'modal.techStack': 'Stack Teknologi',
    'modal.publicRepo': 'Repositori Publik',
    'modal.privateRepo': 'Repositori Private',
    'modal.viewRepo': 'Lihat Repositori',
    'modal.expandPreview': 'Klik untuk Memperbesar Gambar',

    // Contact
    'contact.subtitle': 'Kontak',
    'contact.title': 'Mari Membangun Sesuatu yang Hebat Bersama',
    'contact.desc': 'Baik Anda memiliki peluang kerja, proposal proyek, atau sekadar ingin terhubung, jangan ragu untuk menghubungi saya!',
    'contact.copyEmail': 'Salin Email',
    'contact.copied': 'Tersalin!',
    'contact.nameLabel': 'Nama Anda',
    'contact.namePlaceholder': 'Budi Santoso',
    'contact.emailLabel': 'Email Anda',
    'contact.emailPlaceholder': 'budi@example.com',
    'contact.subjectLabel': 'Subjek',
    'contact.subjectPlaceholder': 'Kolaborasi Proyek / Penawaran Kerja',
    'contact.messageLabel': 'Pesan',
    'contact.messagePlaceholder': 'Halo Hilal, saya ingin mendiskusikan...',
    'contact.sendBtn': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.successMsg': 'Terima kasih! Pesan Anda telah berhasil dikirim.',

    // Resume Modal
    'resume.title': 'Kurikulum Vitae / Resume',
    'resume.download': 'Unduh PDF',

    // Footer
    'footer.builtWith': 'Dirancang dengan Svelte 5 & Tailwind CSS v4',
    'footer.backToTop': 'Kembali ke atas'
  }
};

export const t = derived(currentLang, ($lang) => (key: string): string => {
  const dict = translations[$lang] || translations.en;
  return (dict as Record<string, string>)[key] || key;
});
