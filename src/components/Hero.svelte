<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import type { GitHubProfile } from "../lib/github";
  import profileData from "../data/profile.json";
  import { magnetic } from "../lib/actions";
  import ResumeModal from "./ResumeModal.svelte";

  export let profile: GitHubProfile | null = null;
  export let startTyping: boolean = false;

  let bgRef: HTMLDivElement;
  let heroContentRef: HTMLDivElement;

  let baseText = "Hi, I'm ";
  $: nameText = profileData.fullName;
  $: fullText = baseText + nameText;

  let animationTriggered = false;
  let showResumeModal = false;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Subtle Parallax for the abstract background shapes
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

  // Cinematic staggered fade-up triggered when loading finishes
  $: if (startTyping && heroContentRef && !animationTriggered) {
    animationTriggered = true;

    // Hide all children initially
    const items = heroContentRef.querySelectorAll(".hero-item");
    gsap.set(items, { opacity: 0, y: 30 });
    gsap.set(".scroll-indicator", { opacity: 0 });

    // Staggered reveal
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.2,
    });

    // Reveal scroll indicator last
    gsap.to(".scroll-indicator", {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: "power2.out",
    });
  }
</script>

<section
  id="hero"
  class="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-surface-900"
>
  <!-- Premium Animated Mesh Gradient & Noise Background -->
  <div
    class="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    bind:this={bgRef}
  >
    <!-- Abstract Glowing Orbs -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[130px] mix-blend-screen animate-pulse-slow animation-delay-2000"
    ></div>

    <!-- Fine SVG Noise Texture for an editorial feel -->
    <div
      class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"
    ></div>
  </div>

  <!-- Foreground Content -->
  <div
    bind:this={heroContentRef}
    class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20"
  >
    <!-- Left Column: Text Content -->
    <div
      class="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-2xl"
    >
      <!-- "Available for Work" badge -->
      <div
        class="hero-item opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-800/50 border border-surface-700 backdrop-blur-md text-sm text-gray-300 font-medium shadow-lg"
      >
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Available for Hire
      </div>

      <!-- Main Heading -->
      <h1
        class="hero-item opacity-0 text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight text-white mb-6 leading-tight"
      >
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 drop-shadow-sm"
        >
          {fullText}
        </span>
      </h1>

      <!-- Subheading / Bio -->
      <p
        class="hero-item opacity-0 text-lg sm:text-xl text-gray-400 leading-relaxed font-light mb-10 max-w-xl"
      >
        {profileData.bio}
      </p>

      <!-- Action Buttons -->
      <div
        class="hero-item opacity-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative"
      >
        <!-- Primary Button with Outer Glow -->
        <div class="relative group/btn inline-block">
          <!-- Pulsing Glow Behind Button -->
          <div class="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full opacity-40 blur-md animate-pulse"></div>
          
          <button
            use:magnetic
            on:click={() => showResumeModal = true}
            class="magnetic-btn relative px-8 py-4 rounded-full bg-surface-900 border border-surface-700 hover:border-brand-500/50 hover:bg-surface-800 transition-all duration-300 shadow-xl hover:shadow-brand-500/30 text-white font-semibold text-lg overflow-hidden text-center flex items-center justify-center gap-3 z-10"
          >
            <!-- Hover Gradient Background Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
            ></div>
            
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5 text-brand-400 group-hover/btn:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              View Resume
            </span>
          </button>
        </div>
        <a
          use:magnetic
          href="#projects"
          class="magnetic-btn px-8 py-4 rounded-full bg-surface-800/50 hover:bg-surface-700 text-gray-200 font-medium transition-all border border-surface-600 backdrop-blur-md text-center"
        >
          View My Work
        </a>
      </div>
    </div>

    <!-- Right Column: Profile Image -->
    <div class="hero-item opacity-0 flex-shrink-0 relative">
      {#if profile}
        <div class="relative group">
          <div
            class="absolute -inset-4 bg-gradient-to-tr from-brand-500/30 to-purple-500/30 rounded-full opacity-0 group-hover:opacity-100 transition duration-1000 blur-3xl"
          ></div>
          <div
            class="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full opacity-40 group-hover:opacity-100 transition duration-1000 blur-md"
          ></div>
          <img
            src={profile.avatar_url}
            alt={profile.name}
            class="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border-[8px] border-surface-900 shadow-2xl object-cover"
          />
        </div>
      {/if}
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div
    class="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10 text-gray-500 opacity-0"
  >
    <span class="text-[10px] font-semibold tracking-[0.2em] uppercase"
      >Scroll</span
    >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
