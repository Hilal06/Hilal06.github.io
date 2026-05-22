<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from './components/Hero.svelte';
  import Projects from './components/Projects.svelte';
  import Footer from './components/Footer.svelte';
  import About from './components/About.svelte';
  import Cursor from './components/Cursor.svelte';
  import GlowOrb from './components/GlowOrb.svelte';
  import { getProfile, getRepos, type GitHubProfile } from './lib/github';
  import projectsData from './data/projects.json';
  import Lenis from 'lenis';
  
  let profile: GitHubProfile | null = null;
  let repos: any[] = projectsData;
  let loadingRepos: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

<Cursor />

<main class="min-h-screen flex flex-col bg-surface-900 selection:bg-brand-500/30 selection:text-brand-200">
  <GlowOrb />
  
  <div class="flex-grow relative overflow-hidden">

    <div class="relative z-10">
      <Hero {profile} />
      <About />
      
      {#if error}
        <div class="max-w-7xl mx-auto px-6 mb-12">
          <div class="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        </div>
      {/if}

      <Projects {repos} loading={loadingRepos} />
    </div>
  </div>
  
  <Footer />
</main>
