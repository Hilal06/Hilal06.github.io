<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import type { GitHubProfile } from '../lib/github';
  
  export let profile: GitHubProfile | null = null;

  let bgRef: HTMLImageElement;
  let textRef: HTMLSpanElement;

  let baseText = "Hi, I'm ";
  $: nameText = profile ? (profile.name || profile.login) : "Hilal";
  $: fullText = baseText + nameText;
  
  let displayedText = "";
  let cursorVisible = true;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax background effect
    if (bgRef) {
      gsap.to(bgRef, {
        y: "20vh", // Background moves slower than the page
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Blinking cursor
    setInterval(() => {
      cursorVisible = !cursorVisible;
    }, 500);
  });

  // Typewriter effect triggered when fullText is ready
  $: {
    if (fullText && displayedText === "") {
      let i = 0;
      const typeWriter = () => {
        if (i < fullText.length) {
          displayedText += fullText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      setTimeout(typeWriter, 500); // initial delay
    }
  }
</script>

<section id="hero" class="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
  <!-- Parallax Background Image -->
  <img 
    bind:this={bgRef}
    src="./circuit-board.png" 
    alt="Circuit Board Background" 
    class="absolute top-[-10vh] left-0 w-full h-[120vh] object-cover z-0 pointer-events-none"
  />

  <!-- Dark Gradient Overlays for legibility -->
  <div class="absolute inset-0 bg-gradient-to-b from-surface-900/60 via-surface-900/80 to-surface-900 z-0 pointer-events-none"></div>
  <div class="absolute inset-0 bg-brand-900/20 mix-blend-overlay z-0 pointer-events-none"></div>

  <!-- Foreground Content -->
  <div class="relative z-10 max-w-4xl px-6 flex flex-col items-center">
    
    {#if profile}
      <div class="relative group mb-10">
        <div class="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full opacity-40 group-hover:opacity-100 transition duration-1000 blur-md"></div>
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          class="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-surface-700 shadow-2xl object-cover"
        />
      </div>
    {/if}
    
    <h1 class="text-4xl md:text-7xl font-bold tracking-tight text-white min-h-[4rem] md:min-h-[5rem] flex items-center">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-purple-300 to-brand-100">
        {displayedText}
      </span>
      <span class="inline-block w-[3px] md:w-[5px] h-[35px] md:h-[60px] bg-brand-400 ml-2 {cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity"></span>
    </h1>
    
    <p class="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed font-light">
      {profile?.bio || 'A passionate software developer building modern web applications.'}
    </p>

    <div class="mt-12 flex flex-col sm:flex-row gap-6">
      <a href={profile?.html_url || '#'} target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-1">
        View GitHub
      </a>
      <a href="#about" class="px-8 py-4 rounded-full bg-surface-800/80 hover:bg-surface-700 text-gray-200 font-semibold transition-all border border-surface-600 backdrop-blur-sm hover:-translate-y-1">
        Discover More
      </a>
    </div>

  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10 text-gray-400">
    <span class="text-sm tracking-widest uppercase">Scroll</span>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>
