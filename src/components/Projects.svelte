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

<section id="projects" class="relative w-full min-h-screen py-24 sm:py-32 bg-[#f8fafc] bg-developer-grid z-10">
  <div class="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col gap-12">
    <!-- Header -->
      <div use:reveal={{ y: 30, duration: 1 }} class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 font-mono border-b border-slate-200 pb-8">
        <div class="flex flex-col gap-3 max-w-2xl">
          <div class="flex items-center gap-3 text-xs text-amber-700 font-bold tracking-widest uppercase">
            <span class="w-8 h-[1px] bg-amber-600"></span>
            <span>[SEC // 03 // ARCHIVE] {$t('projects.subtitle')}</span>
          </div>
          <h3 class="bolder-title font-black text-slate-950 tracking-tight">
            &gt; {$t('projects.title')}
          </h3>
          <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-sans font-normal max-w-xl pl-4 border-l-2 border-amber-600/60">
            {$t('projects.desc')}
          </p>
        </div>

        <!-- Segmented Filter Rail -->
        <div class="flex items-center border border-slate-200 bg-white p-1.5 overflow-x-auto scrollbar-none rounded-none self-start lg:self-end shadow-sm">
          {#each categories as category}
            <button
              use:magnetic
              onclick={() => activeFilter = category.key}
              class="magnetic-btn px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none transition-all shrink-0 {activeFilter === category.key ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
            >
              {#if activeFilter === category.key}
                <span class="mr-1.5 text-amber-100">■</span>
              {/if}
              {category.label}
            </button>
          {/each}
        </div>
      </div>

    {#if loading}
      <div class="flex items-center justify-center py-24">
        <div class="flex items-center gap-3 text-amber-600 text-lg font-medium animate-pulse">
          <svg class="animate-spin h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {$t('projects.loading')}
        </div>
      </div>
    {:else if filteredRepos.length === 0}
      <div class="text-center py-20 text-slate-500 text-lg font-mono">
        {$t('projects.noProjects')} "{activeFilter}".
      </div>
    {:else}
      <!-- Structured List of Projects -->
      <div class="flex flex-col gap-8 sm:gap-12 w-full">
        {#each filteredRepos as repo, index}
          <article class="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-none border border-slate-200 bg-white p-6 sm:p-8 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden items-center font-mono">
            <div class="lg:col-span-5 w-full">
              <div class="relative w-full aspect-video rounded-none overflow-hidden border border-slate-200 bg-slate-100">
                {#if repo.screenshot}
                  <img src={repo.screenshot} alt={repo.name} class="w-full h-full object-cover" />
                {:else}
                  <div class="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                    <span>[NO PREVIEW]</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-7 flex flex-col justify-between h-full gap-4 sm:gap-6">
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {repo.name}
                  </h3>
                  {#if repo.language}
                    <span class="text-xs text-amber-700 font-bold">[{repo.language}]</span>
                  {/if}
                </div>
                <p class="text-slate-600 text-sm font-sans leading-relaxed line-clamp-3">
                  {repo.description || 'No description.'}
                </p>
              </div>
              {#if repo.techStack}
                <div class="flex flex-wrap gap-2 text-xs">
                  {#each repo.techStack as tech}
                    <span class="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-medium">[{tech}]</span>
                  {/each}
                </div>
              {/if}
              <div class="flex items-center gap-4 pt-2">
                <button onclick={() => openModal(repo)} class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-none transition-all shadow-sm cursor-pointer">
                  [DETAILS]
                </button>
                {#if !repo.isPrivate && repo.html_url}
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-none border border-slate-300 text-slate-800 hover:text-slate-950 hover:bg-slate-100 text-xs uppercase tracking-wider transition-all font-semibold">
                    [CODE]
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

<style>
  .bolder-title {
    font-size: calc(clamp(2.25rem, 5vw, 3.75rem) * 0.9);
    line-height: 1.05;
  }
</style>
