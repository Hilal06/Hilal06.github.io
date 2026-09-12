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

  let bgRef: HTMLDivElement;
  let heroContentRef: HTMLDivElement;

  let baseText = $derived($t('hero.greeting'));
  let nameText = $derived(profileData.fullName);
  let fullText = $derived(baseText + nameText);

  let animationTriggered = $state(false);
  let showResumeModal = $state(false);

  let hrBadges = $derived([
    { label: $t('hero.locationLabel'), value: $t('hero.locationValue'), icon: "📍" },
    { label: $t('hero.degreeLabel'), value: $t('hero.degreeValue'), icon: "🎓" },
    { label: $t('hero.specialtyLabel'), value: $t('hero.specialtyValue'), icon: "⚡" }
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

<section
  id="hero"
  class="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden bg-surface-900 bg-developer-grid pt-28 pb-16 lg:py-0"
>
  <!-- Background Mesh & Glowing Orbs -->
  <div
    class="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    bind:this={bgRef}
  >
    <div
      class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-600/20 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow animation-delay-2000"
    ></div>

    <!-- Fine Noise Texture -->
    <div
      class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"
    ></div>
  </div>

  <!-- Foreground Content -->
  <div
    bind:this={heroContentRef}
    class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
  >
    <!-- Left Column: Text Content -->
    <div
      class="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-2xl"
    >
      <!-- "Available for Opportunities" Ping Badge -->
      <div
        class="hero-item opacity-0 mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-800/80 border border-brand-500/30 backdrop-blur-md text-xs sm:text-sm text-gray-200 font-mono shadow-xl"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>{$t('hero.statusPing')}</span>
      </div>

      <!-- Main Heading -->
      <h1
        class="hero-item opacity-0 text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
      >
        <span class="hero-title-gradient text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-brand-300">
          {fullText}
        </span>
      </h1>

      <!-- Bio / Subtitle -->
      <p
        class="hero-item opacity-0 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-normal mb-6 max-w-xl"
      >
        {$t('hero.bio')}
      </p>

      <!-- HR Snapshot Quick Info Pills -->
      <div class="hero-item opacity-0 flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
        {#each hrBadges as item}
          <div class="px-3.5 py-1.5 rounded-xl bg-surface-800/60 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-2 backdrop-blur-md">
            <span>{item.icon}</span>
            <span class="text-gray-400">{item.label}:</span>
            <span class="text-white font-medium">{item.value}</span>
          </div>
        {/each}
      </div>

      <!-- Action Buttons -->
      <div
        class="hero-item opacity-0 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
      >
        <button
          use:magnetic
          onclick={() => showResumeModal = true}
          class="magnetic-btn w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-brand-500/30 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{$t('hero.viewResume')}</span>
        </button>

        <a
          use:magnetic
          href="#projects"
          class="magnetic-btn w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface-800/80 hover:bg-surface-700 text-gray-200 hover:text-white font-medium text-base transition-all border border-white/10 backdrop-blur-md flex items-center justify-center gap-2"
        >
          <span>{$t('hero.exploreProjects')}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Right Column: Developer Profile Card & Code Terminal Window -->
    <div class="hero-item opacity-0 w-full lg:w-[480px] flex-shrink-0 flex flex-col gap-5">
      <!-- Candidate Personal Photo & Profile Header Card -->
      <div class="relative group rounded-2xl border border-white/10 bg-surface-800/80 p-4 backdrop-blur-2xl shadow-xl flex items-center gap-4 transition-all duration-300 hover:border-brand-500/40 hover:bg-surface-800">
        <!-- Photo Frame with Glowing Gradient Border & Status Ping -->
        <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-0.5 bg-gradient-to-br from-brand-500 via-purple-500 to-cyan-500 shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <div class="w-full h-full rounded-[14px] overflow-hidden bg-surface-900 flex items-center justify-center relative">
            {#if profile?.avatar_url}
              <img 
                src={profile.avatar_url} 
                alt={profileData.fullName}
                class="w-full h-full object-cover"
              />
            {:else}
              <img 
                src={profileData.avatarUrl} 
                alt={profileData.fullName}
                onerror={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = parent.querySelector('.avatar-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }
                }}
                class="w-full h-full object-cover"
              />
              <div class="avatar-fallback hidden w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-600 to-purple-800 text-white font-mono font-bold text-lg">
                <span>RH</span>
                <span class="text-[9px] text-brand-200">DEV</span>
              </div>
            {/if}
          </div>
          <!-- Live Status Indicator Badge -->
          <span class="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-surface-900"></span>
          </span>
        </div>

        <!-- Profile Details -->
        <div class="flex flex-col text-left overflow-hidden">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-base sm:text-lg font-bold text-white leading-tight truncate">{profileData.fullName}</h3>
            <span class="px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {$t('hero.verifiedDev')}
            </span>
          </div>
          <p class="text-xs text-gray-300 font-mono mt-0.5 truncate">{$t('hero.terminalTitle')}</p>
          <div class="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-gray-400">
            <span class="flex items-center gap-1"><span class="text-emerald-400">📍</span> Probolinggo, ID</span>
            <span class="text-gray-600">•</span>
            <span class="text-brand-300 font-medium">B.S. Informatics</span>
          </div>
        </div>
      </div>

      <!-- Developer Code Terminal Window -->
      <div class="rounded-2xl border border-white/10 bg-surface-800/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden text-left font-mono">
        <!-- Terminal Header -->
        <div class="flex items-center justify-between px-4 py-3 bg-surface-950/90 border-b border-white/10">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span class="text-xs text-gray-400 font-medium">hilal.config.ts</span>
          <div class="w-12"></div>
        </div>

        <!-- Terminal Content Snippet -->
        <div class="p-5 text-xs sm:text-sm leading-relaxed text-gray-300 space-y-2 overflow-x-auto">
          <div>
            <span class="text-purple-400">export const</span> <span class="text-brand-400">developer</span> = &#123;
          </div>
          <div class="pl-4">
            <span class="text-gray-400">name:</span> <span class="text-emerald-300">"{profileData.fullName}"</span>,
          </div>
          <div class="pl-4">
            <span class="text-gray-400">title:</span> <span class="text-emerald-300">"{$t('hero.terminalTitle')}"</span>,
          </div>
          <div class="pl-4">
            <span class="text-gray-400">status:</span> <span class="text-emerald-300">"{$t('hero.terminalStatus')}"</span>,
          </div>
          <div class="pl-4">
            <span class="text-gray-400">coreStack:</span> [
          </div>
          <div class="pl-8 text-amber-300">
            "Laravel", "Svelte 5", "Kotlin", "Docker", "ESP32"
          </div>
          <div class="pl-4">
            ],
          </div>
          <div class="pl-4">
            <span class="text-gray-400">education:</span> <span class="text-emerald-300">"Informatics Engineering B.S."</span>
          </div>
          <div>&#125;;</div>

          <div class="pt-2 text-gray-500 flex items-center gap-2">
            <span class="text-emerald-400">➜</span>
            <span class="text-brand-400">~</span>
            <span class="animate-pulse font-bold text-white">|</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div
    class="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10 text-gray-400 opacity-0 hidden sm:flex"
  >
    <span class="text-[10px] font-mono tracking-[0.2em] uppercase"
      >{$t('hero.scroll')}</span
    >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
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
  .animate-pulse-slow {
    animation: pulseSlow 8s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
</style>
