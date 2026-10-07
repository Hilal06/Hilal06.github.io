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
    class="flex flex-col gap-3.5 border-b border-[var(--color-border)] pb-6"
    use:reveal={{ y: 30, duration: 1 }}
  >
    <div class="flex items-center justify-between gap-4 font-mono text-[11px] text-[var(--color-ink-muted)] uppercase tracking-widest flex-wrap">
      <div class="flex items-center gap-2.5">
        <span class="telemetry-beacon"></span>
        <span class="text-[var(--color-accent-500)] font-semibold">01 — ABOUT</span>
        <span class="text-[var(--color-ink-muted)]">{$t('about.subtitle')}</span>
      </div>
      <div class="text-[var(--color-ink-muted)] text-[10px] hidden sm:block font-medium">
        STATUS: SYS_ONLINE // COORD: -7.98° 112.63°
      </div>
    </div>

    <h3 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-ink-primary)] tracking-[-0.03em] flex items-baseline gap-3">
      <span>{$t('about.title')}</span>
    </h3>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono">
    <!-- Left: Architectural Statement -->
    <div class="lg:col-span-7 flex flex-col gap-6">
      <div class="p-8 sm:p-10 border border-[var(--color-border)] bg-[var(--color-surface-overlay)] shadow-sm flex flex-col gap-6">
        <div class="text-[11px] uppercase tracking-[0.3em] text-[var(--color-ink-muted)] border-b border-[var(--color-border)] pb-3">
          DOSSIER // ARCHITECTURAL DIRECTIVE
        </div>
        <h4 class="monolith-title font-extrabold text-[var(--color-ink-primary)] tracking-[-0.02em] leading-tight">
          {$t('about.philosophyTitle')}
        </h4>
        <p class="text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed font-sans font-normal border-t border-[var(--color-border)] pt-4">
          {$t('about.philosophyBody')}
        </p>
      </div>
    </div>

    <!-- Right: Indexed Chronicle Rows -->
    <div class="lg:col-span-5 flex flex-col divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]">
      {#each highlights as item}
        <div class="py-5 flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-[var(--color-accent-500)] font-bold tracking-widest uppercase">
              0{highlights.indexOf(item) + 1} // {item.badge}
            </span>
            <span class="text-[var(--color-ink-muted)] text-[10px]">[VERIFIED]</span>
          </div>
          <h5 class="text-base font-bold text-[var(--color-ink-primary)] leading-snug">
            {item.title}
          </h5>
          <p class="text-xs text-[var(--color-ink-secondary)] font-sans leading-relaxed">
            {item.subtitle}
          </p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Categorized Skills Ecosystem -->
  <div
    id="skills"
    class="flex flex-col gap-8 pt-6 scroll-mt-32 font-mono"
    use:reveal={{ y: 40, duration: 1, delay: 0.4 }}
  >
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-4">
      <div>
        <span class="text-[10px] uppercase tracking-widest text-[var(--color-accent-500)] font-bold block mb-1">02 — TECHNICAL COMPETENCIES</span>
        <h4 class="text-2xl font-extrabold text-[var(--color-ink-primary)] tracking-[-0.02em]">
          {$t('about.ecosystemTitle')}
        </h4>
      </div>
      <div class="flex items-center gap-4 text-xs text-[var(--color-ink-muted)]">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 bg-[var(--color-accent-500)]"></span> {$t('about.primaryLegend')}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 bg-[var(--color-border)]"></span> {$t('about.toolsLegend')}
        </span>
      </div>
    </div>

    <div class="flex flex-col divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]">
      {#each skillCategories as cat}
        <div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div class="md:col-span-4 flex items-center gap-3">
            <span class="text-[var(--color-accent-500)] text-xs font-bold shrink-0">&gt;</span>
            <span class="text-sm font-bold text-[var(--color-ink-primary)] uppercase tracking-wider">{$t(cat.titleKey)}</span>
          </div>
          <div class="md:col-span-8 flex flex-wrap gap-2">
            {#each cat.skills as skill}
              <span class="px-2.5 py-1 text-xs border transition-colors {skill.isPrimary ? 'bg-[var(--color-accent-50)] border-[var(--color-accent-300)] text-[var(--color-accent-700)] font-semibold' : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-surface-raised)]'}">
                {#if skill.isPrimary}
                  <span class="text-[var(--color-accent-500)] mr-1">●</span>
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

<style>
  .monolith-title { font-size: calc(clamp(1.5rem, 3vw, 2.25rem) * 1); }
  .telemetry-beacon {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: var(--color-accent-500);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
