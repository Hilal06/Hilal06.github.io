<script lang="ts">
  import { magnetic } from '../lib/actions';
  import ResumeModal from './ResumeModal.svelte';
  import { t, currentLang, setLanguage } from '../lib/i18n';

  let showResumeModal = $state(false);
  let isMobileMenuOpen = $state(false);

  let navLinks = $derived([
    { name: $t('nav.about'), href: '#about' },
    { name: $t('nav.skills'), href: '#skills' },
    { name: $t('nav.projects'), href: '#projects' },
    { name: $t('nav.contact'), href: '#contact' }
  ]);
</script>

<header class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
  <nav class="relative flex items-center justify-between px-6 sm:px-10 py-3 bg-[var(--color-surface-overlay)]/95 border border-[var(--color-border)] shadow-md backdrop-blur-md transition-all duration-300">
    <!-- Wordmark -->
    <a href="#hero" class="flex items-center gap-2 font-mono font-extrabold text-lg text-[var(--color-ink-primary)] group">
      <span class="text-[var(--color-accent-500)] font-bold">&gt;</span>
      <span class="tracking-widest uppercase">HILAL06</span>
      <span class="text-xs text-[var(--color-ink-muted)] font-normal ml-1">// STRATUM</span>
    </a>

    <!-- Navigation Links -->
    <div class="hidden md:flex items-center gap-6 font-mono text-xs">
      {#each navLinks as link, i}
        <a 
          href={link.href} 
          class="nav-link uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <span class="nav-prefix font-bold">0{i+1} //</span>
          <span>{link.name}</span>
        </a>
      {/each}
    </div>

    <!-- Utility Group -->
    <div class="hidden md:flex items-center gap-3">
      <div class="flex items-center p-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono">
        <button 
          onclick={() => setLanguage('en')}
          class="px-2.5 py-1 transition-all {$currentLang === 'en' ? 'bg-[var(--color-ink-primary)] text-white font-bold' : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]'}"
          aria-label="Switch to English"
        >
          EN
        </button>
        <button 
          onclick={() => setLanguage('id')}
          class="px-2.5 py-1 transition-all {$currentLang === 'id' ? 'bg-[var(--color-ink-primary)] text-white font-bold' : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]'}"
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
      </div>

      <button 
        onclick={() => showResumeModal = true}
        class="px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-ink-primary)] hover:text-white bg-transparent hover:bg-[var(--color-accent-500)] border border-[var(--color-accent-500)]/60 hover:border-[var(--color-accent-500)] cursor-pointer transition-all duration-200 hover:shadow-[0_0_12px_rgba(217,78,40,0.25)]"
      >
        DOSSIER
      </button>
    </div>

    <!-- Mobile Navigation Toggle -->
    <div class="flex items-center gap-2 md:hidden">
      <div class="flex items-center p-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono mr-1">
        <button 
          onclick={() => setLanguage('en')}
          class="px-2 py-0.5 transition-all {$currentLang === 'en' ? 'bg-[var(--color-ink-primary)] text-white font-bold' : 'text-[var(--color-ink-secondary)]'}"
        >
          EN
        </button>
        <button 
          onclick={() => setLanguage('id')}
          class="px-2 py-0.5 transition-all {$currentLang === 'id' ? 'bg-[var(--color-ink-primary)] text-white font-bold' : 'text-[var(--color-ink-secondary)]'}"
        >
          ID
        </button>
      </div>

      <button 
        onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
        class="p-2 text-[var(--color-ink-primary)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-raised)]"
        aria-label="Toggle navigation menu"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {#if isMobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          {/if}
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Dropdown Menu -->
  {#if isMobileMenuOpen}
    <div class="md:hidden mt-3 p-4 bg-[var(--color-surface-overlay)]/95 border border-[var(--color-border)] backdrop-blur-xl shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
      {#each navLinks as link}
        <a 
          href={link.href} 
          onclick={() => isMobileMenuOpen = false}
          class="px-4 py-2.5 text-sm font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-surface)] transition-all"
        >
          {link.name}
        </a>
      {/each}
      <div class="h-px bg-[var(--color-border)] my-1"></div>
      <button 
        onclick={() => { isMobileMenuOpen = false; showResumeModal = true; }}
        class="w-full py-2.5 text-sm font-semibold text-white bg-[var(--color-accent-500)] hover:bg-[var(--color-accent-600)] transition-all text-center"
      >
        {$t('nav.resume')}
      </button>
    </div>
  {/if}
</header>

<ResumeModal isOpen={showResumeModal} on:close={() => showResumeModal = false} pdfUrl="./resume.pdf" />

<style>
  .nav-link {
    position: relative;
    color: var(--color-ink-muted);
    transition: color 150ms ease;
  }
  .nav-link:hover {
    color: var(--color-ink-primary);
  }
  .nav-link .nav-prefix {
    color: var(--color-accent-500);
    transition: color 150ms ease;
  }
  .nav-link:hover .nav-prefix {
    color: var(--color-accent-600);
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: var(--color-accent-500);
    transition: width 150ms ease;
  }
  .nav-link:hover::after {
    width: 100%;
  }
</style>
