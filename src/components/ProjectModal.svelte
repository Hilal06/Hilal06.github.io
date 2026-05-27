<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let project: any = null;
  export let isOpen: boolean = false;

  let selectedImage: string = '';

  $: if (project) {
    selectedImage = project.images?.[0] || project.screenshot || '';
  }

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      close();
    }
  }
  
  // To prevent scrolling of the background when modal is open
  $: if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && project}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    transition:fade={{ duration: 300, easing: cubicOut }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="absolute inset-0 bg-black/60 backdrop-blur-md" 
      on:click={close}
    ></div>

    <!-- Modal Content -->
    <div 
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-900 border border-surface-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
      transition:fly={{ y: 50, duration: 400, easing: cubicOut }}
    >
      <!-- Close Button -->
      <button 
        on:click={close}
        class="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-brand-500 rounded-full text-white backdrop-blur-sm transition-colors border border-white/10"
        aria-label="Close modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Image Section -->
      {#if selectedImage}
        <div class="w-full md:w-2/5 h-64 md:h-auto relative bg-surface-800 flex-shrink-0 flex flex-col justify-end overflow-hidden">
          {#key selectedImage}
            <img 
              src={selectedImage} 
              alt={project.name} 
              class="absolute inset-0 w-full h-full object-cover"
              in:fade={{ duration: 300 }}
            />
          {/key}
          <div class="absolute inset-0 bg-gradient-to-t from-surface-900 to-transparent md:bg-gradient-to-r md:from-transparent md:to-surface-900 pointer-events-none"></div>
          
          <!-- Thumbnails Overlay -->
          {#if project.images && project.images.length > 1}
            <div 
              class="relative z-10 p-4 flex gap-2 overflow-x-auto w-full snap-x [&::-webkit-scrollbar]:hidden" 
              style="-ms-overflow-style: none; scrollbar-width: none;"
            >
              {#each project.images as img}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img 
                  src={img} 
                  alt="{project.name} thumbnail" 
                  class="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg cursor-pointer border-2 shadow-lg transition-all flex-shrink-0 snap-start {selectedImage === img ? 'border-brand-500 opacity-100 scale-105' : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-105'}"
                  on:click={() => selectedImage = img}
                />
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Content Section -->
      <div class="p-8 md:p-10 flex-grow flex flex-col gap-6">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h2>
          <div class="flex items-center flex-wrap gap-3 text-sm text-gray-400">
            {#if project.isPrivate !== undefined}
              <span class="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full {project.isPrivate ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'}">
                {project.isPrivate ? 'Private' : 'Public'}
              </span>
            {/if}
            {#if project.language}
              <span class="flex items-center gap-1.5 font-medium">
                <span class="w-2.5 h-2.5 rounded-full bg-brand-400"></span>
                {project.language}
              </span>
            {/if}
            {#if project.updated_at}
              <span>• Updated {new Date(project.updated_at).toLocaleDateString()}</span>
            {/if}
          </div>
        </div>

        <div class="w-full h-px bg-surface-700"></div>

        <div>
          <h3 class="text-lg font-semibold text-gray-200 mb-2">Overview</h3>
          <p class="text-gray-400 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {#if project.features && project.features.length > 0}
          <div>
            <h3 class="text-lg font-semibold text-gray-200 mb-2">Key Features</h3>
            <ul class="space-y-2">
              {#each project.features as feature}
                <li class="flex items-start gap-3 text-gray-400">
                  <svg class="w-5 h-5 text-brand-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if project.techStack && project.techStack.length > 0}
          <div>
            <h3 class="text-lg font-semibold text-gray-200 mb-2">Tech Stack</h3>
            <div class="flex flex-wrap gap-2">
              {#each project.techStack as tech}
                <span class="px-3 py-1 bg-surface-800 border border-surface-700 rounded-full text-sm text-brand-300 font-medium">
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        {/if}

        <div class="mt-auto pt-6">
          {#if project.isPrivate}
            <button 
              disabled
              class="inline-flex items-center gap-2 px-6 py-3 bg-surface-700 text-gray-500 font-semibold rounded-full cursor-not-allowed border border-surface-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Private Repository
            </button>
          {:else}
            <a 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View on GitHub
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
