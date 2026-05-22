<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from './components/Hero.svelte';
  import Projects from './components/Projects.svelte';
  import Footer from './components/Footer.svelte';
  import { getProfile, getRepos, type GitHubProfile, type GitHubRepo } from './lib/github';
  
  // List the exact repository names you want to display, in the order you want them to appear.
  // Example: ['my-project', 'another-repo', 'awesome-app']
  // Leave empty [] to automatically display your most recently updated repositories.
  const featuredRepos: string[] = [
    // "my-first-repo",
    // "my-second-repo"
  ];

  let profile: GitHubProfile | null = null;
  let repos: GitHubRepo[] = [];
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
      repos = await getRepos('Hilal06', featuredRepos);
    } catch (err) {
      console.error(err);
      if (!error) error = "Could not load repositories.";
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
