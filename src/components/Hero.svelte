<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import type { GitHubProfile } from '../lib/github';
  import profileData from '../data/profile.json';
  import { magnetic } from '../lib/actions';
  
  export let profile: GitHubProfile | null = null;
  export let startTyping: boolean = false;

  let bgRef: HTMLDivElement;
  let heroContentRef: HTMLDivElement;
  
  let baseText = "Hi, I'm ";
  $: nameText = profileData.fullName;
  $: fullText = baseText + nameText;
  
  let animationTriggered = false;

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
          scrub: true
        }
      });
    }
  });

  // Cinematic staggered fade-up triggered when loading finishes
  $: if (startTyping && heroContentRef && !animationTriggered) {
    animationTriggered = true;
    
    // Hide all children initially (optional since CSS handles initial state, but GSAP is more robust)
    gsap.set(heroContentRef.children, { opacity: 0, y: 30 });
    gsap.set(".scroll-indicator", { opacity: 0 });

    // Staggered reveal
    gsap.to(heroContentRef.children, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.2
    });

    // Reveal scroll indicator last
    gsap.to(".scroll-indicator", {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: "power2.out"
    });
  }
</script>

<section id="hero" class="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-surface-900">
  
  <!-- Premium Animated Mesh Gradient & Noise Background -->
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none" bind:this={bgRef}>
    <!-- Abstract Glowing Orbs -->
    <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[130px] mix-blend-screen animate-pulse-slow animation-delay-2000"></div>
    
    <!-- Fine SVG Noise Texture for an editorial feel -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
  </div>

  <!-- Foreground Content -->
  <div bind:this={heroContentRef} class="relative z-10 max-w-4xl px-6 flex flex-col items-center">
    
    <!-- Profile Image -->
    {#if profile}
      <div class="relative group mb-8 opacity-0">
        <div class="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full opacity-30 group-hover:opacity-70 transition duration-1000 blur-md"></div>
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          class="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-surface-600 shadow-2xl object-cover"
        />
      </div>
    {/if}
    
    <!-- Main Heading -->
    <h1 class="text-4xl md:text-7xl font-bold tracking-tight text-white min-h-[4rem] md:min-h-[5rem] opacity-0">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 drop-shadow-sm">
        {fullText}
      </span>
    </h1>
    
    <!-- Subheading / Bio -->
    <p class="mt-6 text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light opacity-0">
      {profileData.bio}
    </p>

    <!-- Action Buttons -->
    <div class="mt-12 flex flex-col sm:flex-row gap-6 opacity-0">
      <a use:magnetic href={profile?.html_url || '#'} target="_blank" rel="noopener noreferrer" class="magnetic-btn group relative px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all shadow-lg hover:shadow-brand-500/30 overflow-hidden">
        <span class="relative z-10">View GitHub</span>
        <div class="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </a>
      <a use:magnetic href="#about" class="magnetic-btn px-8 py-4 rounded-full bg-surface-800/50 hover:bg-surface-700 text-gray-200 font-medium transition-all border border-surface-600 backdrop-blur-md">
        Discover More
      </a>
    </div>

  </div>
  
  <!-- Scroll Indicator -->
  <div class="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10 text-gray-500 opacity-0">
    <span class="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>

<style>
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  .animate-pulse-slow {
    animation: pulseSlow 8s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
</style>
