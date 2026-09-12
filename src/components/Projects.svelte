<script lang="ts">
  import ProjectModal from './ProjectModal.svelte';
  import { magnetic, reveal } from '../lib/actions';
  import type { Project } from '../lib/types';
  import { t } from '../lib/i18n';

  let { repos = [], loading = true }: { repos: Project[], loading: boolean } = $props();

  let selectedProject = $state<Project | null>(null);
  let isModalOpen = $state(false);
  let activeFilter = $state<string>('All');

  let categories = $derived([
    { key: 'All', label: $t('projects.cat.all') },
    { key: 'Android & Mobile', label: $t('projects.cat.android') },
    { key: 'Full Stack', label: $t('projects.cat.fullstack') },
    { key: 'IoT & Embedded', label: $t('projects.cat.iot') },
    { key: 'Open Source', label: $t('projects.cat.opensource') }
  ]);

  let filteredRepos = $derived.by(() => {
    if (activeFilter === 'All') return repos;
    if (activeFilter === 'Open Source') return repos.filter(r => !r.isPrivate);
    if (activeFilter === 'Android & Mobile') {
      return repos.filter(r => {
        const name = (r.name || '').toLowerCase();
        const tech = (r.techStack || []).join(' ').toLowerCase();
        return name.includes('wed') || tech.includes('kotlin') || tech.includes('android');
      });
    }
    if (activeFilter === 'IoT & Embedded') {
      return repos.filter(r => {
        const name = (r.name || '').toLowerCase();
        const tech = (r.techStack || []).join(' ').toLowerCase();
        return name.includes('fish') || name.includes('attend') || tech.includes('esp32') || tech.includes('arduino');
      });
    }
    return repos.filter(r => {
      const matchTech = r.techStack?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
      const matchDesc = r.description?.toLowerCase().includes(activeFilter.toLowerCase());
      return matchTech || matchDesc;
    });
  });

  function getProjectBadge(repoName: string): string {
    const name = repoName.toLowerCase();
    if (name.includes('smart') || name.includes('attend')) return 'Enterprise Full-Stack';
    if (name.includes('fish') || name.includes('feeder')) return 'IoT & Embedded Hardware';
    if (name.includes('linux')) return 'Linux DevOps & TUI';
    if (name.includes('win')) return 'Windows Automation';
    if (name.includes('wed-planner') || name.includes('wed planner')) return 'Native Android App';
    if (name.includes('wedding')) return 'Modern Web & CMS';
    return 'Software Project';
  }

  function openModal(project: Project) {
    selectedProject = project;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    setTimeout(() => selectedProject = null, 300);
  }
</script>

<section id="projects" class="relative w-full min-h-screen py-24 sm:py-32 bg-surface-900 bg-developer-grid z-10">
  <div class="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col gap-12">
    <!-- Header -->
    <div use:reveal={{ y: 30, duration: 1 }} class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="flex flex-col gap-3">
        <h2 class="text-xs font-mono tracking-[0.3em] uppercase text-brand-400 font-semibold flex items-center gap-4">
          <span class="w-12 h-[1px] bg-brand-400"></span>
          {$t('projects.subtitle')}
        </h2>
        <h3 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {$t('projects.title')}
        </h3>
        <p class="text-gray-400 text-sm sm:text-base max-w-xl">
          {$t('projects.desc')}
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {#each categories as category}
          <button
            use:magnetic
            onclick={() => activeFilter = category.key}
            class="magnetic-btn px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded-full transition-all duration-300 shrink-0 border {activeFilter === category.key ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-surface-800/80 border-white/10 text-gray-400 hover:text-white hover:bg-surface-700'}"
          >
            {category.label}
          </button>
        {/each}
      </div>
    </div>

    {#if loading}
      <div class="flex items-center justify-center py-24">
        <div class="flex items-center gap-3 text-brand-400 text-lg font-medium animate-pulse">
          <svg class="animate-spin h-6 w-6 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {$t('projects.loading')}
        </div>
      </div>
    {:else if filteredRepos.length === 0}
      <div class="text-center py-20 text-gray-400 text-lg font-mono">
        {$t('projects.noProjects')} "{activeFilter}".
      </div>
    {:else}
      <!-- Structured List of Projects -->
      <div class="flex flex-col gap-8 sm:gap-12 w-full">
        {#each filteredRepos as repo, index}
          <article 
            use:reveal={{ y: 40, duration: 0.8, delay: index * 0.1 }}
            class="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-3xl border border-white/10 bg-surface-800/50 backdrop-blur-xl p-6 sm:p-8 hover:border-brand-500/40 hover:bg-surface-800/80 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 overflow-hidden items-center"
          >
            <!-- Left Side: Image Preview -->
            <div class="lg:col-span-5 w-full">
              <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-surface-900 shadow-xl group-hover:border-brand-500/30 transition-all duration-500">
                {#if repo.screenshot}
                  <img 
                    src={repo.screenshot} 
                    alt={repo.name} 
                    loading="lazy" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                {:else}
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-800 to-surface-900 text-gray-600 font-mono text-sm">
                    <span>No Preview Available</span>
                  </div>
                {/if}
                <div class="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>

                <!-- Status Badge -->
                {#if repo.isPrivate !== undefined}
                  <span class="absolute top-4 left-4 px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full backdrop-blur-md border shadow-md {repo.isPrivate ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-brand-500/20 text-brand-300 border-brand-500/30'}">
                    {repo.isPrivate ? $t('modal.privateRepo') : $t('modal.publicRepo')}
                  </span>
                {/if}
              </div>
            </div>

            <!-- Right Side: Details & Description -->
            <div class="lg:col-span-7 flex flex-col justify-between h-full gap-4 sm:gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <div class="flex items-center gap-3 flex-wrap">
                    <h3 class="text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-400 transition-colors duration-300">
                      {repo.name}
                    </h3>
                    <span class="px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-300">
                      {getProjectBadge(repo.name)}
                    </span>
                  </div>

                  {#if repo.language}
                    <span class="flex items-center gap-1.5 text-xs font-mono text-gray-300 font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5">
                      <span class="w-2 h-2 rounded-full bg-brand-400"></span>
                      {repo.language}
                    </span>
                  {/if}
                </div>

                <p class="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {repo.description || 'No description available for this project.'}
                </p>
              </div>

              <!-- Tech Stack Badges -->
              {#if repo.techStack && repo.techStack.length > 0}
                <div class="flex flex-wrap gap-2">
                  {#each repo.techStack as tech}
                    <span class="px-3 py-1 text-xs font-mono rounded-full bg-surface-900/90 border border-white/10 text-brand-300 font-medium">
                      {tech}
                    </span>
                  {/each}
                </div>
              {/if}

              <!-- Action Buttons -->
              <div class="flex items-center gap-4 pt-2">
                <button 
                  use:magnetic 
                  onclick={() => openModal(repo)} 
                  class="magnetic-btn px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-500/30 flex items-center gap-2"
                >
                  <span>{$t('projects.viewDetails')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                {#if !repo.isPrivate && repo.html_url}
                  <a 
                    use:magnetic 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="magnetic-btn px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>GitHub</span>
                  </a>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- Detail Modal Popup -->
<ProjectModal 
  project={selectedProject} 
  isOpen={isModalOpen} 
  on:close={closeModal} 
/>
