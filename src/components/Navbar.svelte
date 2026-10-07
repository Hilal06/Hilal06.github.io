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
  <nav class="relative flex items-center justify-between px-6 sm:px-10 py-3 rounded-none bg-white/95 border border-slate-200 shadow-md backdrop-blur-md transition-all duration-300">
    <!-- Monolith Wordmark -->
    <a href="#hero" class="flex items-center gap-2 font-mono font-extrabold text-lg text-slate-900 group">
      <span class="text-amber-600 font-bold">&gt;</span>
      <span class="tracking-widest uppercase">HILAL06</span>
      <span class="text-xs text-slate-500 font-normal ml-1">// MONOLITH</span>
    </a>

    <!-- Swiss Column Links (Static In-Place Color Transition) -->
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

    <!-- Minimalist Utility Group -->
    <div class="hidden md:flex items-center gap-3">
      <div class="flex items-center p-0.5 rounded-none bg-slate-100 border border-slate-200 text-xs font-mono">
        <button 
          onclick={() => setLanguage('en')}
          class="px-2.5 py-1 rounded-none transition-all {$currentLang === 'en' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}"
          aria-label="Switch to English"
        >
          EN
        </button>
        <button 
          onclick={() => setLanguage('id')}
          class="px-2.5 py-1 rounded-none transition-all {$currentLang === 'id' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}"
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
      </div>

      <button 
        onclick={() => showResumeModal = true}
        class="px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 hover:text-white bg-transparent hover:bg-amber-600 border border-amber-600/60 hover:border-amber-600 rounded-none cursor-pointer transition-all duration-200 hover:shadow-[0_0_12px_rgba(217,119,6,0.25)]"
      >
        DOSSIER
      </button>
    </div>

    <!-- Mobile Navigation Toggle -->
    <div class="flex items-center gap-2 md:hidden">
      <div class="flex items-center p-0.5 rounded-none bg-slate-100 border border-slate-200 text-xs font-mono mr-1">
        <button 
          onclick={() => setLanguage('en')}
          class="px-2 py-0.5 rounded-none transition-all {$currentLang === 'en' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}"
        >
          EN
        </button>
        <button 
          onclick={() => setLanguage('id')}
          class="px-2 py-0.5 rounded-none transition-all {$currentLang === 'id' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}"
        >
          ID
        </button>
      </div>

      <button 
        onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
        class="p-2 rounded-none text-slate-900 border border-slate-200 bg-slate-100 hover:bg-slate-200"
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
    <div class="md:hidden mt-3 p-4 rounded-none bg-white/95 border border-slate-200 backdrop-blur-xl shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
      {#each navLinks as link}
        <a 
          href={link.href} 
          onclick={() => isMobileMenuOpen = false}
          class="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-none transition-all"
        >
          {link.name}
        </a>
      {/each}
      <div class="h-px bg-slate-200 my-1"></div>
      <button 
        onclick={() => { isMobileMenuOpen = false; showResumeModal = true; }}
        class="w-full py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-none transition-all text-center"
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
    color: #64748b;
    transition: color 150ms ease;
  }
  .nav-link:hover {
    color: #0f172a;
  }
  .nav-link .nav-prefix {
    color: #d97706;
    transition: color 150ms ease;
  }
  .nav-link:hover .nav-prefix {
    color: #b45309;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #d97706;
    transition: width 150ms ease;
  }
  .nav-link:hover::after {
    width: 100%;
  }
</style>
