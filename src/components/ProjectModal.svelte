<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { magnetic } from '../lib/actions';
  import type { Project } from '../lib/types';

  let { project = null, isOpen = false }: { project: Project | null, isOpen: boolean } = $props();

  let selectedImage = $state<string>('');
  let isPreviewOpen = $state<boolean>(false);
  let modalRef = $state<HTMLElement | null>(null);
  let previouslyFocusedElement: HTMLElement | null = null;
  let imageError = $state<boolean>(false);

  $effect(() => {
    if (project) {
      selectedImage = project.images?.[0] || project.screenshot || '';
      imageError = false;
    }
  });

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (isPreviewOpen) {
        isPreviewOpen = false;
      } else if (isOpen) {
        close();
      }
    }
    if (event.key === 'Tab' && isOpen && modalRef) {
      const focusables = modalRef.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
  
  $effect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        previouslyFocusedElement = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          modalRef?.focus();
        }, 50);
      } else {
        document.body.style.overflow = '';
        previouslyFocusedElement?.focus();
      }
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && project}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
    role="presentation"
    data-lenis-prevent
    onwheel={(e) => e.stopPropagation()}
    ontouchmove={(e) => e.stopPropagation()}
    transition:fade={{ duration: 300, easing: cubicOut }}
  >
    <div 
      class="absolute inset-0 bg-[var(--color-ink-primary)]/60 backdrop-blur-md" 
      onclick={close}
      onkeydown={e => e.key === 'Enter' && close()}
      role="button"
      tabindex="0"
      aria-label="Close modal"
    ></div>

    <!-- Modal Window Container -->
    <div 
      bind:this={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      tabindex="-1"
      class="relative w-full max-w-5xl max-h-[85vh] bg-[var(--color-surface-overlay)] border border-[var(--color-border)] shadow-2xl overflow-hidden flex flex-col z-10 my-auto outline-none"
      data-lenis-prevent
      transition:fly={{ y: 50, duration: 400, easing: cubicOut }}
    >
      <!-- Header Bar -->
      <div class="flex items-center justify-between px-6 py-3.5 bg-[var(--color-surface)] border-b border-[var(--color-border)] shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-[var(--color-accent-200)]"></span>
          <span class="w-3 h-3 bg-[var(--color-accent-400)]"></span>
          <span class="w-3 h-3 bg-[var(--color-accent-500)]"></span>
        </div>

        <div class="flex items-center gap-2 px-4 py-1 bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-ink-secondary)] max-w-xs sm:max-w-md truncate">
          <span class="text-[var(--color-accent-500)] font-bold">&gt;</span>
          <span class="truncate">{project.html_url || `project://${project.name}`}</span>
        </div>

        <button 
          onclick={close}
          class="p-1.5 hover:bg-[var(--color-surface-raised)] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Main Body Container -->
      <div 
        class="flex flex-col md:flex-row flex-grow overflow-y-auto overscroll-contain"
        data-lenis-prevent
      >
        <!-- Left: Image & Gallery Section -->
        <div class="w-full md:w-1/2 lg:w-7/12 bg-[var(--color-surface)] p-6 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] shrink-0 justify-between">
          <div class="relative w-full aspect-video overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-overlay)] group">
            {#if selectedImage && !imageError}
              {#key selectedImage}
                <button 
                  class="absolute inset-0 w-full h-full cursor-zoom-in outline-none"
                  onclick={() => isPreviewOpen = true}
                  aria-label="View full image"
                >
                  <img 
                    src={selectedImage} 
                    alt={project.name} 
                    loading="lazy"
                    decoding="async"
                    onerror={() => imageError = true}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    in:fade={{ duration: 300 }}
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div class="bg-[var(--color-ink-primary)]/80 text-white px-4 py-2 backdrop-blur-md flex items-center gap-2 font-mono text-xs border border-[var(--color-ink-muted)] transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                      <span>Click to Expand Preview</span>
                    </div>
                  </div>
                </button>
              {/key}
            {:else}
              <!-- Architectural Schematic Fallback -->
              <div class="w-full h-full flex flex-col justify-between p-5 bg-[var(--color-surface)] relative select-none overflow-hidden border border-dashed border-[var(--color-border)]">
                <div class="absolute inset-0 bg-developer-grid opacity-60 pointer-events-none"></div>
                <!-- Corner Crosshairs -->
                <span class="absolute top-2 left-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>
                <span class="absolute top-2 right-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>
                <span class="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>
                <span class="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--color-ink-muted)] opacity-50 select-none">+</span>

                <!-- Header Status -->
                <div class="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider text-[var(--color-ink-muted)] uppercase border-b border-[var(--color-border)] pb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="inline-block w-1.5 h-1.5 bg-[var(--color-accent-500)]"></span>
                    <span class="font-bold text-[var(--color-ink-secondary)]">SYS.SCHEMATIC</span>
                  </div>
                  <span class="text-[9px] font-bold">NO_PREVIEW // 404</span>
                </div>

                <!-- Center Graphic & Label -->
                <div class="relative z-10 flex flex-col items-center justify-center gap-2.5 my-auto py-2 text-center">
                  <div class="w-12 h-12 border border-[var(--color-border)] bg-[var(--color-surface-overlay)] flex items-center justify-center text-[var(--color-accent-500)] shadow-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square">
                      <rect x="3" y="3" width="18" height="18" stroke-dasharray="2 2" />
                      <line x1="3" y1="9" x2="21" y2="9" stroke-dasharray="2 2" />
                      <line x1="9" y1="21" x2="9" stroke-dasharray="2 2" />
                      <circle cx="6" cy="6" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div class="flex flex-col gap-1 font-mono">
                    <span class="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
                      Preview Schematic
                    </span>
                    <span class="text-[10px] text-[var(--color-ink-muted)] max-w-xs leading-normal">
                      Visual asset pending for this repository. Overview generated via architecture specs.
                    </span>
                  </div>
                </div>

                <!-- Footer -->
                <div class="relative z-10 flex items-center justify-between text-[9px] font-mono text-[var(--color-ink-muted)] pt-2 border-t border-[var(--color-border)]">
                  <span class="truncate max-w-[65%]">REF: {project.name}</span>
                  <span class="text-[var(--color-accent-500)] font-semibold">[STANDALONE]</span>
                </div>
              </div>
            {/if}
          </div>

          <!-- Thumbnails Carousel Bar -->
          {#if project.images && project.images.length > 1}
            <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {#each project.images as img}
                <button
                  type="button"
                  onclick={() => { selectedImage = img; imageError = false; }}
                  class="flex-shrink-0 outline-none overflow-hidden transition-all duration-300"
                >
                  <img 
                    src={img} 
                    alt="{project.name} thumbnail" 
                    loading="lazy"
                    decoding="async"
                    class="w-20 h-14 object-cover border-2 transition-all block {selectedImage === img ? 'border-[var(--color-accent-500)] scale-105 shadow-md' : 'border-[var(--color-border)] opacity-60 hover:opacity-100 hover:scale-105'}"
                  />
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Right: Details Section -->
        <div 
          class="p-6 sm:p-8 flex-grow flex flex-col gap-6 overflow-y-auto overscroll-contain bg-[var(--color-surface-overlay)]"
          data-lenis-prevent
        >
          <!-- Title & Badges -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3 flex-wrap">
              {#if project.isPrivate !== undefined}
                <span class="px-3 py-1 text-xs font-mono uppercase tracking-wider font-bold border shadow-sm {project.isPrivate ? 'bg-red-50 text-red-700 border-red-200' : 'bg-[var(--color-accent-50)] text-[var(--color-accent-700)] border-[var(--color-accent-300)]'}">
                  {project.isPrivate ? 'Private Repo' : 'Public Repo'}
                </span>
              {/if}
              {#if project.language}
                <span class="flex items-center gap-1.5 text-xs font-mono text-[var(--color-accent-700)] font-medium px-3 py-1 border border-[var(--color-accent-200)] bg-[var(--color-accent-50)]">
                  <span class="w-2 h-2 rounded-full bg-[var(--color-accent-500)]"></span>
                  {project.language}
                </span>
              {/if}
            </div>

            <h2 id="project-modal-title" class="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink-primary)] font-mono tracking-[-0.02em]">{project.name}</h2>
          </div>

          <div class="w-full h-px bg-[var(--color-border)]"></div>

          <!-- Overview -->
          <div class="flex flex-col gap-2">
            <h3 class="text-xs font-mono tracking-wider uppercase text-[var(--color-accent-500)] font-bold">Overview</h3>
            <p class="text-[var(--color-ink-secondary)] text-sm sm:text-base leading-relaxed font-sans">
              {project.longDescription || project.description}
            </p>
          </div>

          <!-- Key Features -->
          {#if project.features && project.features.length > 0}
            <div class="flex flex-col gap-3">
              <h3 class="text-xs font-mono tracking-wider uppercase text-[var(--color-accent-500)] font-bold">Key Features</h3>
              <ul class="space-y-2.5">
                {#each project.features as feature}
                  <li class="flex items-start gap-3 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-normal">
                    <span class="text-[var(--color-accent-500)] font-mono shrink-0 mt-0.5">&gt;</span>
                    <span>{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Tech Stack -->
          {#if project.techStack && project.techStack.length > 0}
            <div class="flex flex-col gap-2">
              <h3 class="text-xs font-mono tracking-wider uppercase text-[var(--color-accent-500)] font-bold">Tech Stack</h3>
              <div class="flex flex-wrap gap-2">
                {#each project.techStack as tech}
                  <span class="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-ink-primary)] font-medium">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          {/if}

          <!-- CTA Buttons -->
          <div class="mt-auto pt-6 border-t border-[var(--color-border)] flex items-center gap-4 flex-wrap">
            {#if project.isPrivate}
              <button 
                disabled
                class="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface)] text-[var(--color-ink-muted)] text-xs sm:text-sm font-mono font-medium cursor-not-allowed border border-[var(--color-border)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Private Repository
              </button>
            {:else}
              <a 
                use:magnetic
                href={project.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                class="magnetic-btn inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-accent-500)] hover:bg-[var(--color-accent-600)] text-white font-mono font-bold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View Repository &rarr;
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Full Screen Image Preview -->
  {#if isPreviewOpen}
    <div 
      class="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-ink-primary)]/90 backdrop-blur-xl p-4 sm:p-8"
      transition:fade={{ duration: 200 }}
    >
      <button 
        class="absolute inset-0 w-full h-full cursor-zoom-out outline-none"
        onclick={() => isPreviewOpen = false}
        aria-label="Close preview"
      ></button>
      
      <button 
        onclick={() => isPreviewOpen = false}
        class="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-[var(--color-accent-500)] text-white backdrop-blur-sm transition-all duration-300 border border-white/20 cursor-pointer"
        aria-label="Close preview"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <img 
        src={selectedImage} 
        alt="{project.name} full screen" 
        class="relative max-w-full max-h-full object-contain z-10 shadow-2xl border border-[var(--color-ink-muted)]"
        transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
      />
    </div>
  {/if}
{/if}
