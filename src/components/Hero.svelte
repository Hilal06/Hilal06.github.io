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

<section id="hero" class="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#f8fafc] bg-developer-grid pt-28 pb-16 lg:py-0">
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none" bind:this={bgRef}>
    <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-400/15 rounded-full blur-[140px] mix-blend-multiply animate-pulse-slow"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[150px] mix-blend-multiply animate-pulse-slow"></div>
  </div>
  <div bind:this={heroContentRef} class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
    <div class="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-2xl font-mono">
      <div class="bios-docket-bar mb-6 w-full p-2.5 bg-white border border-slate-200 shadow-sm flex items-center justify-between text-[11px] select-none">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-amber-600 rounded-none inline-block animate-pulse"></span>
          <span class="text-amber-700 font-bold uppercase tracking-wider">BOOT://HILAL_CORE v2026</span>
        </div>
        <span class="text-slate-500">ADDR: 0x7F // OK</span>
      </div>

      <h1 class="text-4xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-slate-950 mb-6 leading-[1.05]">
        <span class="text-amber-600">&gt; </span><span>{fullText}</span>
      </h1>

      <div class="p-4 bg-white/80 border border-slate-200 shadow-sm mb-6 max-w-xl text-left">
        <p class="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-normal">
          {$t('hero.bio')}
        </p>
      </div>

      <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
        {#each hrBadges as item}
          <div class="px-3 py-1.5 rounded-none bg-white border border-slate-200 text-xs text-slate-800 shadow-sm flex items-center gap-2">
            <span class="text-amber-700 font-bold">&gt; {item.label}:</span>
            <span class="text-slate-900 font-medium">{item.value}</span>
          </div>
        {/each}
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button onclick={() => showResumeModal = true} class="w-full sm:w-auto px-7 py-3 rounded-none bg-amber-600 hover:bg-amber-700 text-white border border-amber-600 font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors duration-100">
          <span>[POST: {$t('hero.viewResume')}]</span>
        </button>
        <a href="#projects" class="w-full sm:w-auto px-7 py-3 rounded-none bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors duration-100">
          <span>[JUMP: {$t('hero.exploreProjects')}]</span>
        </a>
      </div>
    </div>
    <!-- Right side profile card -->
    <div class="w-full lg:w-[480px] flex-shrink-0 flex flex-col gap-5">
      <div class="brutalist-badge rounded-none border border-slate-200 bg-white p-4 flex items-center gap-4 shadow-md transition-all duration-300">
        <!-- Square Avatar -->
        <div class="w-16 h-16 rounded-none overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
          <img src={profile?.avatar_url || profileData.avatarUrl} alt={profileData.fullName} class="w-full h-full object-cover rounded-none" />
        </div>

        <div class="flex flex-col text-left">
          <h3 class="text-base font-extrabold text-slate-900 tracking-tight">{profileData.fullName}</h3>
          <p class="text-xs text-amber-700 font-mono mt-0.5">{$t('hero.terminalTitle')}</p>
          <div class="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-slate-500">
            <span class="text-amber-600 font-bold">#</span>
            <span class="text-slate-700">BACKEND // IOT SPECIALIST</span>
          </div>
        </div>
      </div>
      <div class="docket-box rounded-none border border-slate-200 bg-white overflow-hidden text-left font-mono shadow-md transition-all duration-300">
        <!-- Top Technical Docket Strip -->
        <div class="docket-header px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-700">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-amber-600"></span>
            <span class="font-bold text-slate-800">CONFIG // hilal.config.ts</span>
          </div>
          <span class="text-[10px] text-emerald-600 font-bold">[READY]</span>
        </div>

        <div class="p-5 text-xs text-slate-700 leading-relaxed bg-slate-50/50">
          <div class="space-y-1.5">
            <div>
              <span class="text-amber-700 font-bold">export const</span>
              <span class="text-slate-900 font-bold"> developer</span>
              <span class="text-slate-600"> = </span>
              <span class="text-slate-800">&#123;</span>
            </div>
            <div class="pl-4">
              <span class="text-slate-500">name:</span>
              <span class="text-amber-800 font-medium"> "{profileData.fullName}"</span>,
            </div>
            <div class="pl-4">
              <span class="text-slate-500">status:</span>
              <span class="text-emerald-700 font-semibold"> "Available"</span>
            </div>
            <div>
              <span class="text-slate-800">&#125;</span>;
            </div>
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
  .brutalist-badge { border-radius: 0 !important; }
  .docket-box { border-radius: 0 !important; }
</style>
