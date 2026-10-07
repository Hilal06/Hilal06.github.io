<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import type { GitHubProfile } from "../lib/types";
  import profileData from "../data/profile.json";
  import { magnetic } from "../lib/actions";
  import ResumeModal from "./ResumeModal.svelte";
  import { t } from "../lib/i18n";

  let { profile = null, startTyping = false }: { profile?: GitHubProfile | null, startTyping?: boolean } = $props();

  let bgRef: HTMLDivElement | undefined = $state();
  let heroContentRef: HTMLDivElement | undefined = $state();

  let baseText = $derived($t('hero.greeting'));
  let nameText = $derived(profileData.fullName);
  let fullText = $derived(baseText + nameText);

  let animationTriggered = $state(false);
  let showResumeModal = $state(false);

  let hrBadges = $derived([
    { label: $t('hero.locationLabel'), value: $t('hero.locationValue'), type: "location" },
    { label: $t('hero.degreeLabel'), value: $t('hero.degreeValue'), type: "degree" },
    { label: $t('hero.specialtyLabel'), value: $t('hero.specialtyValue'), type: "specialty" }
  ]);

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef) {
      gsap.to(bgRef, {
        y: "15vh",
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  $effect(() => {
    if (startTyping && heroContentRef && !animationTriggered) {
      animationTriggered = true;

      const items = heroContentRef.querySelectorAll(".hero-item");
      gsap.set(items, { opacity: 0, y: 30 });
      gsap.set(".scroll-indicator", { opacity: 0 });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.to(".scroll-indicator", {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
      });
    }
  });
</script>

<section id="hero" class="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden bg-[var(--color-canvas)] bg-developer-grid pt-28 pb-16 lg:py-0">
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none" bind:this={bgRef}>
    <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[var(--color-accent-500)]/10 blur-[140px] mix-blend-multiply animate-pulse-slow"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-accent-400)]/8 blur-[150px] mix-blend-multiply animate-pulse-slow"></div>
  </div>
  <div bind:this={heroContentRef} class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
    <div class="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-2xl font-mono">
      <!-- Stratum-style section tag -->
      <div class="mb-6 w-full flex items-center gap-3 text-xs text-[var(--color-ink-muted)] tracking-widest uppercase select-none">
        <span class="text-[var(--color-accent-500)] font-bold">00 —</span>
        <span>BOOT://HILAL_CORE v2026</span>
        <span class="flex-1 h-px bg-[var(--color-border)]"></span>
        <span class="text-[10px]">ADDR: 0x7F // OK</span>
      </div>

      <h1 class="text-4xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-[-0.03em] text-[var(--color-ink-primary)] mb-6 leading-[1.05] text-left">
        <span>{baseText}</span><span class="text-[var(--color-ink-secondary)]">{nameText}</span>
      </h1>

      <div class="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] mb-6 max-w-xl text-left">
        <p class="text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed font-sans font-normal">
          {$t('hero.bio')}
        </p>
      </div>

      <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
        {#each hrBadges as item}
          <div class="px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs flex items-center gap-2">
            <span class="text-[var(--color-accent-500)] font-bold">{item.label}:</span>
            <span class="text-[var(--color-ink-primary)] font-medium">{item.value}</span>
          </div>
        {/each}
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button onclick={() => showResumeModal = true} class="w-full sm:w-auto px-7 py-3 bg-[var(--color-accent-500)] hover:bg-[var(--color-accent-600)] text-white border border-[var(--color-accent-500)] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors duration-150">
          <span>{$t('hero.viewResume')}</span>
        </button>
        <a href="#projects" class="w-full sm:w-auto px-7 py-3 bg-[var(--color-surface-overlay)] hover:bg-[var(--color-surface)] text-[var(--color-ink-primary)] border border-[var(--color-border)] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors duration-150">
          <span>{$t('hero.exploreProjects')}</span>
        </a>
      </div>
    </div>
    <!-- Right side profile card -->
    <div class="w-full lg:w-[480px] flex-shrink-0 flex flex-col gap-5">
      <div class="border border-[var(--color-border)] bg-[var(--color-surface-overlay)] p-4 flex items-center gap-4 shadow-md transition-all duration-300">
        <!-- Square Avatar -->
        <div class="w-16 h-16 overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shrink-0">
          <img src={profile?.avatar_url || profileData.avatarUrl} alt={profileData.fullName} class="w-full h-full object-cover" />
        </div>

        <div class="flex flex-col text-left">
          <h3 class="text-base font-extrabold text-[var(--color-ink-primary)] tracking-tight">{profileData.fullName}</h3>
          <p class="text-xs text-[var(--color-accent-500)] font-mono mt-0.5">{$t('hero.terminalTitle')}</p>
          <div class="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-[var(--color-ink-muted)]">
            <span class="text-[var(--color-accent-500)] font-bold">#</span>
            <span class="text-[var(--color-ink-secondary)]">BACKEND // IOT SPECIALIST</span>
          </div>
        </div>
      </div>
      <div class="terminal-v1 font-mono text-left shadow-lg overflow-hidden transition-all duration-300 border border-[var(--color-border)] bg-[var(--color-surface-overlay)] shadow-md">
        <!-- Top Technical Docket Strip -->
        <div class="terminal-v1-header px-4 py-2 flex items-center justify-between text-[11px] select-none">
          <div class="flex items-center gap-2">
            <span class="terminal-v1-dot w-2 h-2 inline-block"></span>
            <span class="font-bold tracking-wider">CONFIG // hilal.config.ts</span>
          </div>
          <div class="flex items-center gap-2 text-[10px]">
            <span class="terminal-v1-tag px-1.5 py-0.5 tracking-wider font-semibold">[READY]</span>
            <span class="opacity-60 hidden sm:inline">branch: main*</span>
          </div>
        </div>

        <!-- Code Body -->
        <div class="terminal-v1-body p-5 text-xs leading-relaxed">
          <div class="space-y-1.5">
            <div>
              <span class="terminal-v1-keyword font-bold">export const</span>
              <span class="terminal-v1-ident font-bold"> developer</span>
              <span class="terminal-v1-punct"> = </span>
              <span class="terminal-v1-bracket">&#123;</span>
            </div>
            <div class="pl-4">
              <span class="terminal-v1-prop">name:</span>
              <span class="terminal-v1-string font-medium"> "{profileData.fullName}"</span>,
            </div>
            <div class="pl-4">
              <span class="terminal-v1-prop">focus:</span>
              <span class="terminal-v1-string font-medium"> "Backend &amp; Embedded IoT"</span>,
            </div>
            <div class="pl-4">
              <span class="terminal-v1-prop">status:</span>
              <span class="terminal-v1-status font-semibold"> "Available"</span>
            </div>
            <div>
              <span class="terminal-v1-bracket">&#125;</span>;
            </div>
          </div>
        </div>

        <!-- Git Activity Telemetry Footer -->
        <div class="terminal-v1-footer px-4 py-2.5 text-[10px] flex items-center justify-between gap-3 border-t select-none">
          <div class="flex items-center gap-2 truncate">
            <span class="terminal-v1-git-icon text-[11px] font-bold"></span>
            <span class="text-white/70 truncate">git status: 240+ commits // clean</span>
          </div>
          <div class="flex items-center gap-1 shrink-0" title="Recent activity streak">
            <span class="w-1.5 h-1.5 bg-emerald-500/30 inline-block"></span>
            <span class="w-1.5 h-1.5 bg-emerald-500/50 inline-block"></span>
            <span class="w-1.5 h-1.5 bg-emerald-500/80 inline-block"></span>
            <span class="w-1.5 h-1.5 bg-emerald-400 inline-block"></span>
            <span class="w-1.5 h-1.5 bg-emerald-400 inline-block"></span>
            <span class="w-1.5 h-1.5 bg-emerald-500 inline-block"></span>
            <span class="w-1.5 h-1.5 bg-emerald-400 animate-pulse inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<ResumeModal isOpen={showResumeModal} on:close={() => showResumeModal = false} pdfUrl="./resume.pdf" />

<style>
  @keyframes pulseSlow {
    0%,
    100% {
    transform: scale(1);
    opacity: 0.8;
    }
    50% {
    transform: scale(1.1);
    opacity: 1;
    }
  }
  .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
  .terminal-v1 {
    background-color: #121110;
    border: 1px solid #2b2724;
    border-radius: 0px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  }
  .terminal-v1-header {
    background-color: #1a1816;
    border-bottom: 1px solid #2b2724;
    color: #a8a29e;
  }
  .terminal-v1-dot {
    background-color: #e05730;
    opacity: calc(0.7 + 0.6 * 0.3);
  }
  .terminal-v1-tag {
    background-color: rgba(16, 185, 129, 0.15);
    color: #34d399;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  .terminal-v1-body {
    background-color: #121110;
    color: #d6d3d1;
  }
  .terminal-v1-keyword {
    color: #e05730;
    filter: saturate(calc(0.7 + 0.6 * 0.6));
  }
  .terminal-v1-ident { color: #fafaf9; }
  .terminal-v1-punct, .terminal-v1-bracket { color: #78716c; }
  .terminal-v1-prop { color: #a8a29e; }
  .terminal-v1-string { color: #fb923c; }
  .terminal-v1-status { color: #34d399; }
  .terminal-v1-footer {
    background-color: #161514;
    border-color: #262320;
    color: #a8a29e;
  }
  .terminal-v1-git-icon { color: #e05730; }
</style>
