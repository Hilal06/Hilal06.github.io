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
  import { getProfile, getRepos, type GitHubProfile } from './lib/github';
  import projectsData from './data/projects.json';
  import Lenis from 'lenis';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);
  
  let profile: GitHubProfile | null = null;
  let repos: any[] = projectsData;
  let loadingRepos: boolean = true;
  let error: string | null = null;
  let showLoader: boolean = true;
  let lenisInstance: any = null;

  onMount(async () => {
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

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    });

    gsap.ticker.lagSmoothing(0, 0);

    try {
      profile = await getProfile('Hilal06');
    } catch (err) {
      console.error(err);
      error = "Could not load profile.";
    }

    try {
      // Fetch user repos (up to 100) to match with our local list
      const githubRepos = await getRepos('Hilal06'); 
      
      repos = projectsData.map(localRepo => {
        const ghRepo = githubRepos.find(r => r.html_url === localRepo.html_url);
        if (ghRepo) {
          return {
            ...localRepo,
            name: ghRepo.name,
            language: ghRepo.language,
            updated_at: ghRepo.updated_at
          };
        }
        
        return {
          ...localRepo,
          name: localRepo.html_url.split('/').pop() || 'Project',
          language: '',
          updated_at: new Date().toISOString()
        };
      });
    } catch (err) {
      console.error("Could not fetch repo details", err);
      // Fallback to just extracting names from URL
      repos = projectsData.map(localRepo => ({
          ...localRepo,
          name: localRepo.html_url.split('/').pop() || 'Project',
          language: '',
          updated_at: new Date().toISOString()
      }));
    } finally {
      loadingRepos = false;
    }
  });
</script>

{#if showLoader}
  <LoadingScreen loading={loadingRepos} on:complete={() => {
    showLoader = false;
    if (lenisInstance) lenisInstance.start();
  }} />
{/if}

<main class="min-h-screen flex flex-col bg-surface-900 selection:bg-brand-500/30 selection:text-brand-200">
  <GlowOrb />
  
  <div class="flex-grow relative overflow-hidden">

    <div class="relative z-10">
      <Hero {profile} startTyping={!showLoader} />
      <About />
      <SkillsMarquee />
      
      {#if error}
        <div class="max-w-7xl mx-auto px-6 mb-12">
          <div class="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        </div>
      {/if}

      <Projects {repos} loading={loadingRepos} />
      <Contact />
    </div>
  </div>
  
  <Footer />
</main>
