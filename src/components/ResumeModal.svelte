<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { magnetic } from '../lib/actions';
  import { t } from '../lib/i18n';

  let { isOpen = false, pdfUrl = './resume.pdf' }: { isOpen: boolean, pdfUrl?: string } = $props();

  let modalRef = $state<HTMLElement | null>(null);
  let previouslyFocusedElement: HTMLElement | null = null;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      close();
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

{#if isOpen}
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

    <!-- Modal Content -->
    <div 
      bind:this={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      tabindex="-1"
      class="relative w-full max-w-5xl h-[85vh] bg-[var(--color-surface-overlay)] border border-[var(--color-border)] shadow-2xl overflow-hidden flex flex-col z-10 my-auto outline-none"
      data-lenis-prevent
      transition:fly={{ y: 50, duration: 400, easing: cubicOut }}
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-2.5 bg-[var(--color-status-ok)] animate-pulse"></div>
          <h2 id="resume-modal-title" class="text-base sm:text-lg font-bold text-[var(--color-ink-primary)] font-mono">{$t('resume.title')}</h2>
        </div>
        
        <div class="flex items-center gap-3">
          <a
            use:magnetic
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Rifaul_Hilal_Resume.pdf"
            class="magnetic-btn px-5 py-2 bg-[var(--color-accent-500)] hover:bg-[var(--color-accent-600)] text-white text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            {$t('resume.download')}
          </a>
          <button 
            onclick={close}
            class="p-2 hover:bg-[var(--color-surface-raised)] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer"
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
      <div class="flex-grow w-full h-full bg-[var(--color-surface)] relative">
        <iframe 
          src="{pdfUrl}#toolbar=0&navpanes=0" 
          title="Resume PDF" 
          class="absolute inset-0 w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  </div>
{/if}
