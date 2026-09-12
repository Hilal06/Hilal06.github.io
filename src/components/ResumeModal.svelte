<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { magnetic } from '../lib/actions';
  import { t } from '../lib/i18n';

  let { isOpen = false, pdfUrl = './resume.pdf' }: { isOpen: boolean, pdfUrl?: string } = $props();

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      close();
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

{#if isOpen}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
    role="region"
    aria-label="Resume modal container"
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

    <!-- Modal Content -->
    <div 
      class="relative w-full max-w-5xl h-[85vh] bg-surface-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10 my-auto"
      data-lenis-prevent
      transition:fly={{ y: 50, duration: 400, easing: cubicOut }}
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface-950/80 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <h2 class="text-base sm:text-lg font-bold text-white font-mono">{$t('resume.title')}</h2>
        </div>
        
        <div class="flex items-center gap-3">
          <a
            use:magnetic
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Rifaul_Hilal_Resume.pdf"
            class="magnetic-btn px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-brand-500/20"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            {$t('resume.download')}
          </a>
          <button 
            onclick={close}
            class="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- PDF Viewer -->
      <div class="flex-grow w-full h-full bg-surface-950 relative">
        <iframe 
          src="{pdfUrl}#toolbar=0&navpanes=0" 
          title="Resume PDF" 
          class="absolute inset-0 w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  </div>
{/if}
