<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from './components/Hero.svelte';
  import Projects from './components/Projects.svelte';
  import Footer from './components/Footer.svelte';
  import About from './components/About.svelte';
  import Contact from './components/Contact.svelte';
  import GlowOrb from './components/GlowOrb.svelte';
  import LoadingScreen from './components/LoadingScreen.svelte';
  import SkillsMarquee from './components/SkillsMarquee.svelte';
  import Navbar from './components/Navbar.svelte';
  import { getProfile, getRepos } from './lib/github';
  import type { GitHubProfile, Project } from './lib/types';
  import projectsData from './data/projects.json';
  import Lenis from 'lenis';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { themeState } from './lib/theme.svelte';
  
  gsap.registerPlugin(ScrollTrigger);
  
  let profile = $state<GitHubProfile | null>(null);
  let repos = $state<Project[]>(projectsData as Project[]);
  let loadingRepos = $state(true);
  let error = $state<string | null>(null);
  let showLoader = $state(true);
  let lenisInstance = $state<any>(null);

  onMount(() => {
    // Initialize theme from saved storage
    themeState.setTheme(themeState.current);

    // Force scroll to top on reload
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    
    lenisInstance = lenis;
    lenis.stop(); // Disable scrolling while loader is active

    const scrollHandler = () => ScrollTrigger.update();
    lenis.on('scroll', scrollHandler);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0, 0);

    (async () => {
      try {
        profile = await getProfile('Hilal06');
      } catch (err) {
        console.error(err);
      }

      try {
        // Fetch user repos (up to 100) to match with our local list
        const githubRepos = await getRepos('Hilal06'); 
        
        repos = projectsData.map(localRepo => {
          const ghRepo = githubRepos.find(r => r.html_url === localRepo.html_url);
          if (ghRepo) {
            return {
              ...(localRepo as Project),
              name: ghRepo.name,
              language: ghRepo.language,
              updated_at: ghRepo.updated_at
            };
          }
          
          return {
            ...(localRepo as Project),
            name: localRepo.html_url.split('/').pop() || 'Project',
            language: '',
            updated_at: new Date().toISOString()
          };
        });
      } catch (err) {
        console.error("Could not fetch repo details", err);
        // Fallback to just extracting names from URL
        repos = projectsData.map(localRepo => ({
            ...(localRepo as Project),
            name: localRepo.html_url.split('/').pop() || 'Project',
            language: '',
            updated_at: new Date().toISOString()
        }));
      } finally {
        loadingRepos = false;
      }
    })();

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.off('scroll', scrollHandler);
      lenis.destroy();
    };
  });
</script>

{#if showLoader}
  <LoadingScreen loading={loadingRepos} on:complete={() => {
    showLoader = false;
    if (lenisInstance) lenisInstance.start();
  }} />
{/if}

<main class="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 selection:bg-amber-500/20 selection:text-amber-900">
  <Navbar />
  <GlowOrb />
  
  <div class="flex-grow relative overflow-hidden">

    <div class="relative">
      <Hero {profile} startTyping={!showLoader} />
      <SkillsMarquee />
      
      {#if error}
        <div class="max-w-7xl mx-auto px-6 mb-12">
          <div class="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        </div>
      {/if}

      <Projects {repos} loading={loadingRepos} />
      <About />
      <Contact />
    </div>
  </div>
  
  <Footer />
</main>
