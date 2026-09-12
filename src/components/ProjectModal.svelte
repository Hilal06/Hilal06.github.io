<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { magnetic } from '../lib/actions';
  import type { Project } from '../lib/types';

  let { project = null, isOpen = false }: { project: Project | null, isOpen: boolean } = $props();

  let selectedImage = $state<string>('');
  let isPreviewOpen = $state<boolean>(false);

  $effect(() => {
    if (project) {
      selectedImage = project.images?.[0] || project.screenshot || '';
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
  }
  
  $effect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && project}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
    role="region"
    aria-label="Modal container"
    data-lenis-prevent
    onwheel={(e) => e.stopPropagation()}
    ontouchmove={(e) => e.stopPropagation()}
    transition:fade={{ duration: 300, easing: cubicOut }}
  >
    <div 
      class="absolute inset-0 bg-black/80 backdrop-blur-md" 
      onclick={close}
      onkeydown={e => e.key === 'Enter' && close()}
      role="button"
      tabindex="0"
      aria-label="Close modal"
    ></div>

    <!-- Modal Window Container -->
    <div 
      class="relative w-full max-w-5xl max-h-[85vh] bg-surface-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10 my-auto"
      data-lenis-prevent
      transition:fly={{ y: 50, duration: 400, easing: cubicOut }}
    >
      <!-- IDE Window Header Bar -->
      <div class="flex items-center justify-between px-6 py-3.5 bg-surface-950/80 border-b border-white/10 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
        </div>

        <div class="flex items-center gap-2 px-4 py-1 rounded-full bg-surface-900 border border-white/10 text-xs font-mono text-gray-400 max-w-xs sm:max-w-md truncate">
          <svg class="w-3.5 h-3.5 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.39-2.823-1.07-4" />
          </svg>
          <span class="truncate">{project.html_url || `project://${project.name}`}</span>
        </div>

        <button 
          onclick={close}
          class="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
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
        {#if selectedImage}
          <div class="w-full md:w-1/2 lg:w-7/12 bg-surface-950/60 p-6 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-white/10 shrink-0 justify-between">
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-surface-900 group">
              {#key selectedImage}
                <button 
                  class="absolute inset-0 w-full h-full cursor-zoom-in outline-none"
                  onclick={() => isPreviewOpen = true}
                  aria-label="View full image"
                >
                  <img 
                    src={selectedImage} 
                    alt={project.name} 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    in:fade={{ duration: 300 }}
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div class="bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 font-mono text-xs border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                      <span>Click to Expand Preview</span>
                    </div>
                  </div>
                </button>
              {/key}
            </div>

            <!-- Thumbnails Carousel Bar -->
            {#if project.images && project.images.length > 1}
              <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {#each project.images as img}
                  <button
                    type="button"
                    onclick={() => selectedImage = img}
                    class="flex-shrink-0 outline-none rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <img 
                      src={img} 
                      alt="{project.name} thumbnail" 
                      class="w-20 h-14 object-cover rounded-xl border-2 transition-all block {selectedImage === img ? 'border-brand-500 scale-105 shadow-lg shadow-brand-500/20' : 'border-white/10 opacity-50 hover:opacity-100 hover:scale-105'}"
                    />
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        {/if}

        <!-- Right: Details Section -->
        <div 
          class="p-6 sm:p-8 flex-grow flex flex-col gap-6 overflow-y-auto overscroll-contain"
          data-lenis-prevent
        >
          <!-- Title & Badges -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3 flex-wrap">
              {#if project.isPrivate !== undefined}
                <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full border shadow-sm {project.isPrivate ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-brand-500/20 text-brand-300 border-brand-500/30'}">
                  {project.isPrivate ? 'Private Repo' : 'Public Repo'}
                </span>
              {/if}
              {#if project.language}
                <span class="flex items-center gap-1.5 text-xs font-mono text-gray-300 font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  <span class="w-2 h-2 rounded-full bg-brand-400"></span>
                  {project.language}
                </span>
              {/if}
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{project.name}</h2>
          </div>

          <div class="w-full h-px bg-white/10"></div>

          <!-- Overview -->
          <div class="flex flex-col gap-2">
            <h3 class="text-xs font-mono tracking-wider uppercase text-brand-400 font-semibold">Overview</h3>
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          <!-- Key Features -->
          {#if project.features && project.features.length > 0}
            <div class="flex flex-col gap-3">
              <h3 class="text-xs font-mono tracking-wider uppercase text-brand-400 font-semibold">Key Features</h3>
              <ul class="space-y-2.5">
                {#each project.features as feature}
                  <li class="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-normal">
                    <span class="text-brand-400 font-mono shrink-0 mt-0.5">✦</span>
                    <span>{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Tech Stack -->
          {#if project.techStack && project.techStack.length > 0}
            <div class="flex flex-col gap-2">
              <h3 class="text-xs font-mono tracking-wider uppercase text-brand-400 font-semibold">Tech Stack</h3>
              <div class="flex flex-wrap gap-2">
                {#each project.techStack as tech}
                  <span class="px-3 py-1 bg-surface-950 border border-white/10 rounded-full text-xs font-mono text-brand-300 font-medium">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          {/if}

          <!-- CTA Buttons -->
          <div class="mt-auto pt-6 border-t border-white/10 flex items-center gap-4 flex-wrap">
            {#if project.isPrivate}
              <button 
                disabled
                class="inline-flex items-center gap-2 px-6 py-3 bg-surface-800 text-gray-400 text-xs sm:text-sm font-mono font-medium rounded-full cursor-not-allowed border border-white/10"
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
                class="magnetic-btn inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View Repository
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
      class="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
      transition:fade={{ duration: 200 }}
    >
      <button 
        class="absolute inset-0 w-full h-full cursor-zoom-out outline-none"
        onclick={() => isPreviewOpen = false}
        aria-label="Close preview"
      ></button>
      
      <button 
        onclick={() => isPreviewOpen = false}
        class="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-brand-500 rounded-full text-white backdrop-blur-sm transition-all duration-300 border border-white/20"
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
        class="relative max-w-full max-h-full object-contain z-10 rounded-2xl shadow-2xl border border-white/10"
        transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
      />
    </div>
  {/if}
{/if}
