<script lang="ts">
  import profileData from "../data/profile.json";
  import { reveal } from "../lib/actions";
  import { t } from "../lib/i18n";

  interface SkillItem {
    name: string;
    isPrimary?: boolean;
  }

  interface SkillCategory {
    titleKey: string;
    icon: string;
    skills: SkillItem[];
  }

  const skillCategories: SkillCategory[] = [
    {
      titleKey: "cat.backend",
      icon: "M5 12h14M12 5l7 7-7 7",
      skills: [
        { name: "Laravel", isPrimary: true },
        { name: "NodeJS" },
        { name: "Python" },
        { name: "PHP", isPrimary: true },
        { name: "Supabase Cloud" },
        { name: "PostgreSQL", isPrimary: true },
        { name: "MySQL" },
        { name: "RabbitMQ AMQP" },
        { name: "REST APIs", isPrimary: true }
      ]
    },
    {
      titleKey: "cat.mobile",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      skills: [
        { name: "Kotlin", isPrimary: true },
        { name: "Jetpack Compose (M3)", isPrimary: true },
        { name: "Room SQLite DB", isPrimary: true },
        { name: "Android SDK", isPrimary: true },
        { name: "Coroutines & Flow" },
        { name: "CAS Storage Engine" }
      ]
    },
    {
      titleKey: "cat.iot",
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      skills: [
        { name: "ESP32 / ESP8266", isPrimary: true },
        { name: "Arduino C++", isPrimary: true },
        { name: "Node-RED" },
        { name: "MQTT Protocol", isPrimary: true },
        { name: "Grafana" },
        { name: "WebSockets" }
      ]
    },
    {
      titleKey: "cat.devops",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      skills: [
        { name: "Docker", isPrimary: true },
        { name: "Ubuntu / Fedora Server", isPrimary: true },
        { name: "Bash / Shell Scripting", isPrimary: true },
        { name: "TUI Automation" },
        { name: "Homelab Microservices" },
        { name: "Git", isPrimary: true }
      ]
    },
    {
      titleKey: "cat.frontend",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      skills: [
        { name: "Svelte 5", isPrimary: true },
        { name: "React (Inertia.js)" },
        { name: "TypeScript", isPrimary: true },
        { name: "JavaScript" },
        { name: "Tailwind CSS v4", isPrimary: true },
        { name: "Vite" },
        { name: "GSAP" }
      ]
    }
  ];

  let highlights = $derived([
    {
      title: $t('about.highlights.eduTitle'),
      subtitle: $t('about.highlights.eduSub'),
      badge: $t('about.highlights.eduBadge')
    },
    {
      title: $t('about.highlights.expTitle'),
      subtitle: $t('about.highlights.expSub'),
      badge: $t('about.highlights.expBadge')
    },
    {
      title: $t('about.highlights.homeTitle'),
      subtitle: $t('about.highlights.homeSub'),
      badge: $t('about.highlights.homeBadge')
    }
  ]);
</script>

<section
  id="about"
  class="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 flex flex-col gap-16"
>
  <!-- Header -->
  <div
    class="flex flex-col gap-3"
    use:reveal={{ y: 30, duration: 1 }}
  >
    <h2 class="text-xs font-mono tracking-[0.3em] uppercase text-brand-400 font-semibold flex items-center gap-4">
      <span class="w-12 h-[1px] bg-brand-400"></span>
      {$t('about.subtitle')}
    </h2>
    <h3 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
      {$t('about.title')}
    </h3>
  </div>

  <!-- Bio & Highlights Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
    <!-- Left: Biography -->
    <div
      class="lg:col-span-7 flex flex-col gap-6"
      use:reveal={{ y: 40, duration: 1, delay: 0.2 }}
    >
      <div class="p-8 rounded-3xl border border-white/10 bg-surface-800/40 backdrop-blur-xl shadow-xl flex flex-col gap-4">
        <h4 class="text-xl font-bold text-white flex items-center gap-3">
          <span class="w-2 h-6 rounded-full bg-brand-500"></span>
          {$t('about.philosophyTitle')}
        </h4>
        <p class="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
          {$t('about.philosophyBody')}
        </p>
      </div>
    </div>

    <!-- Right: Highlights Cards -->
    <div
      class="lg:col-span-5 flex flex-col gap-4"
      use:reveal={{ y: 40, duration: 1, delay: 0.3 }}
    >
      {#each highlights as item}
        <div class="p-6 rounded-2xl border border-white/10 bg-surface-800/60 backdrop-blur-xl hover:border-brand-500/40 transition-all duration-300 flex flex-col gap-2 group">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {item.badge}
            </span>
          </div>
          <h5 class="text-base sm:text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
            {item.title}
          </h5>
          <p class="text-xs sm:text-sm text-gray-400">
            {item.subtitle}
          </p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Categorized Skills Ecosystem -->
  <div
    id="skills"
    class="flex flex-col gap-8 pt-6 scroll-mt-32"
    use:reveal={{ y: 40, duration: 1, delay: 0.4 }}
  >
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <h4 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
        {$t('about.ecosystemTitle')}
      </h4>
      <div class="flex items-center gap-4 text-xs font-mono text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-brand-400"></span> {$t('about.primaryLegend')}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-surface-600"></span> {$t('about.toolsLegend')}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each skillCategories as cat}
        <div class="p-6 rounded-2xl border border-white/10 bg-surface-800/50 backdrop-blur-xl hover:border-brand-500/30 transition-all duration-300 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={cat.icon} />
              </svg>
            </div>
            <h5 class="text-base font-bold text-white leading-snug">{$t(cat.titleKey)}</h5>
          </div>

          <div class="flex flex-wrap gap-2">
            {#each cat.skills as skill}
              <span class="px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-default border flex items-center gap-1.5 {skill.isPrimary ? 'bg-brand-500/15 border-brand-500/40 text-brand-300 font-semibold shadow-sm shadow-brand-500/10' : 'bg-surface-900 border-white/10 text-gray-300 hover:text-white hover:border-white/20'}">
                {#if skill.isPrimary}
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                {/if}
                {skill.name}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
