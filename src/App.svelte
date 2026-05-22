<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from './components/Hero.svelte';
  import Projects from './components/Projects.svelte';
  import Footer from './components/Footer.svelte';
  import { getProfile, getRepos, type GitHubProfile } from './lib/github';
  import projectsData from './data/projects.json';
  
  let profile: GitHubProfile | null = null;
  let repos: any[] = projectsData;
  let loadingRepos: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      profile = await getProfile('Hilal06');
    } catch (err) {
      console.error(err);
      error = "Could not load profile.";
    }

    try {
      // Fetch user repos (up to 100) to match with our local list
      const githubRepos = await getRepos('Hilal06', []); 
      
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

<main class="min-h-screen flex flex-col bg-surface-900 selection:bg-brand-500/30 selection:text-brand-200">
  <div class="flex-grow relative overflow-hidden">
    <!-- Subtle background effect -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="relative z-10">
      <Hero {profile} />
      
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
