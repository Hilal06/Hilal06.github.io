<script lang="ts">
  import ProjectModal from './ProjectModal.svelte';
  import { magnetic, reveal } from '../lib/actions';
  import type { Project } from '../lib/types';
  import { t } from '../lib/i18n';

  let { repos = [], loading = true }: { repos: Project[], loading: boolean } = $props();

  let selectedProject = $state<Project | null>(null);
  let isModalOpen = $state(false);
  let activeFilter = $state<string>('All');
  let imageErrors = $state<Record<string, boolean>>({});

  function handleImageError(name: string) {
    imageErrors[name] = true;
  }

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
    if (name.includes('telemetry') || name.includes('daemon') || name.includes('cli')) return 'CLI & Systems Daemon';
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

<section id="projects" class="relative w-full min-h-screen py-24 sm:py-32 bg-[var(--color-canvas)] bg-developer-grid z-10">
  <div class="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col gap-12">
    <!-- Header -->
      <div use:reveal={{ y: 30, duration: 1 }} class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 font-mono border-b border-[var(--color-border)] pb-8">
        <div class="flex flex-col gap-3 max-w-2xl">
          <div class="flex items-center gap-3 text-xs text-[var(--color-accent-500)] font-bold tracking-widest uppercase">
            <span class="w-8 h-[1px] bg-[var(--color-accent-500)]"></span>
            <span>03 — ARCHIVE // {$t('projects.subtitle')}</span>
          </div>
          <h3 class="bolder-title font-black text-[var(--color-ink-primary)] tracking-[-0.03em]">
            {$t('projects.title')}
          </h3>
          <p class="text-[var(--color-ink-secondary)] text-sm sm:text-base leading-relaxed font-sans font-normal max-w-xl pl-4 border-l-2 border-[var(--color-accent-500)]/60">
            {$t('projects.desc')}
          </p>
        </div>

        <!-- Segmented Filter Rail -->
        <div class="flex items-center border border-[var(--color-border)] bg-[var(--color-surface-overlay)] p-1.5 overflow-x-auto scrollbar-none self-start lg:self-end shadow-sm">
          {#each categories as category}
            <button
              use:magnetic
              onclick={() => activeFilter = category.key}
              class="magnetic-btn px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 {activeFilter === category.key ? 'bg-[var(--color-accent-500)] text-white shadow-sm' : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-surface)]'}"
            >
              {#if activeFilter === category.key}
                <span class="mr-1.5 text-white/60">■</span>
              {/if}
              {category.label}
            </button>
          {/each}
        </div>
      </div>

    {#if loading}
      <div class="flex items-center justify-center py-24">
        <div class="flex items-center gap-3 text-[var(--color-accent-500)] text-lg font-medium animate-pulse">
          <svg class="animate-spin h-6 w-6 text-[var(--color-accent-500)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {$t('projects.loading')}
        </div>
      </div>
    {:else if filteredRepos.length === 0}
      <div class="text-center py-20 text-[var(--color-ink-muted)] text-lg font-mono">
        {$t('projects.noProjects')} "{activeFilter}".
      </div>
    {:else}
      <!-- Structured List of Projects -->
      <div class="flex flex-col gap-8 sm:gap-12 w-full">
        {#each filteredRepos as repo, index}
          <article class="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 border border-[var(--color-border)] bg-[var(--color-surface-overlay)] p-6 sm:p-8 hover:border-[var(--color-ink-muted)] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden items-center font-mono">
            <div class="lg:col-span-5 w-full">
              <div class="relative w-full aspect-video overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                {#if repo.screenshot && !imageErrors[repo.name]}
                  <img 
                    src={repo.screenshot} 
                    alt={repo.name} 
                    loading="lazy"
                    decoding="async"
                    onerror={() => handleImageError(repo.name)}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                {:else}
                  <!-- Architectural Schematic Fallback for Missing / Broken Image -->
                  <div class="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-[var(--color-surface)] relative select-none overflow-hidden border border-dashed border-[var(--color-border)]">
                    <!-- Blueprint Grid Pattern Background -->
                    <div class="absolute inset-0 bg-developer-grid opacity-60 pointer-events-none"></div>

                    <!-- Corner Registration Crosshairs (+) -->
                    <span class="absolute top-2 left-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>
                    <span class="absolute top-2 right-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>
                    <span class="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>
                    <span class="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>

                    <!-- Top Header Status -->
                    <div class="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider text-[var(--color-ink-muted)] uppercase border-b border-[var(--color-border)] pb-2">
                      <div class="flex items-center gap-1.5">
                        <span class="inline-block w-1.5 h-1.5 bg-[var(--color-accent-500)]"></span>
                        <span class="font-bold text-[var(--color-ink-secondary)]">SYS.SCHEMATIC</span>
                      </div>
                      <span class="text-[9px] text-[var(--color-ink-muted)] font-bold">404 // NO_PREVIEW</span>
                    </div>

                    <!-- Center Blueprint Graphic & Label -->
                    <div class="relative z-10 flex flex-col items-center justify-center gap-2.5 my-auto py-1 text-center">
                      <div class="w-10 h-10 border border-[var(--color-border)] bg-[var(--color-surface-overlay)] flex items-center justify-center text-[var(--color-accent-500)] shadow-xs transition-transform duration-300 group-hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square">
                          <rect x="3" y="3" width="18" height="18" stroke-dasharray="2 2" />
                          <line x1="3" y1="9" x2="21" y2="9" stroke-dasharray="2 2" />
                          <line x1="9" y1="21" x2="9" stroke-dasharray="2 2" />
                          <circle cx="6" cy="6" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <div class="flex flex-col gap-0.5 font-mono">
                        <span class="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
                          Preview Unavailable
                        </span>
                        <span class="text-[10px] text-[var(--color-ink-muted)]">
                          CLI / Headless or Asset Pending
                        </span>
                      </div>
                    </div>

                    <!-- Bottom Technical Reference Footer -->
                    <div class="relative z-10 flex items-center justify-between text-[9px] font-mono text-[var(--color-ink-muted)] pt-2 border-t border-[var(--color-border)]">
                      <span class="truncate max-w-[65%]">REF: {repo.name}</span>
                      <span class="text-[var(--color-accent-500)] font-semibold">[STANDALONE]</span>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-7 flex flex-col justify-between h-full gap-4 sm:gap-6">
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink-primary)]">
                    {repo.name}
                  </h3>
                  {#if repo.language}
                    <span class="text-xs text-[var(--color-accent-500)] font-bold">[{repo.language}]</span>
                  {/if}
                </div>
                <p class="text-[var(--color-ink-secondary)] text-sm font-sans leading-relaxed line-clamp-3">
                  {repo.description || 'No description.'}
                </p>
              </div>
              {#if repo.techStack}
                <div class="flex flex-wrap gap-2 text-xs">
                  {#each repo.techStack as tech}
                    <span class="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink-secondary)] font-medium">[{tech}]</span>
                  {/each}
                </div>
              {/if}
              <div class="flex items-center gap-4 pt-2">
                <button onclick={() => openModal(repo)} class="px-6 py-2.5 bg-[var(--color-accent-500)] hover:bg-[var(--color-accent-600)] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer">
                  [DETAILS]
                </button>
                {#if !repo.isPrivate && repo.html_url}
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 border border-[var(--color-border)] text-[var(--color-ink-primary)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-surface)] text-xs uppercase tracking-wider transition-all font-semibold">
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
