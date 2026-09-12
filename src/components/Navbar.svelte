<script lang="ts">
  import { magnetic } from '../lib/actions';
  import ResumeModal from './ResumeModal.svelte';
  import { t, currentLang, setLanguage } from '../lib/i18n';
  import { currentTheme, toggleTheme } from '../lib/theme';

  let showResumeModal = $state(false);
  let isMobileMenuOpen = $state(false);

  let navLinks = $derived([
    { name: $t('nav.about'), href: '#about' },
    { name: $t('nav.skills'), href: '#skills' },
    { name: $t('nav.projects'), href: '#projects' },
    { name: $t('nav.contact'), href: '#contact' }
  ]);
</script>

<header class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
  <nav class="relative flex items-center justify-between px-5 sm:px-8 py-3 rounded-full bg-surface-900/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
    <!-- Brand Logo -->
    <a href="#hero" class="flex items-center gap-2 font-mono font-bold text-base sm:text-lg text-white group">
      <span class="text-brand-400 group-hover:-translate-x-0.5 transition-transform">&lt;</span>
      <span class="tracking-tight">Hilal06</span>
      <span class="text-brand-400 group-hover:translate-x-0.5 transition-transform">/&gt;</span>
    </a>

    <!-- Desktop Nav Links -->
    <div class="hidden md:flex items-center gap-1 sm:gap-2">
      {#each navLinks as link}
        <a 
          use:magnetic
          href={link.href} 
          class="magnetic-btn px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
        >
          {link.name}
        </a>
      {/each}
    </div>

    <!-- Right Side CTA Buttons -->
    <div class="hidden md:flex items-center gap-3">
      <!-- Theme Switcher Button -->
      <button 
        use:magnetic
        onclick={toggleTheme}
        class="magnetic-btn p-2 rounded-full bg-surface-800 border border-white/10 text-gray-300 hover:text-white hover:border-brand-500/40 transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle Light / Dark Mode"
        title="Toggle Theme"
      >
        {#if $currentTheme === 'dark'}
          <!-- Sun Icon for Light Mode -->
          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <!-- Moon Icon for Dark Mode -->
          <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <!-- Language Switcher Pill -->
      <div class="flex items-center p-1 rounded-full bg-surface-800 border border-white/10 text-xs font-mono">
        <button 
          onclick={() => setLanguage('en')}
          class="px-2.5 py-1 rounded-full transition-all duration-300 {$currentLang === 'en' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'}"
          aria-label="Switch to English"
        >
          🇬🇧 EN
        </button>
        <button 
          onclick={() => setLanguage('id')}
          class="px-2.5 py-1 rounded-full transition-all duration-300 {$currentLang === 'id' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'}"
          aria-label="Switch to Indonesian"
        >
          🇮🇩 ID
        </button>
      </div>

      <button 
        use:magnetic
        onclick={() => showResumeModal = true}
        class="magnetic-btn px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-full transition-all duration-300 shadow-md hover:shadow-brand-500/20"
      >
        {$t('nav.resume')}
      </button>
    </div>

    <!-- Mobile Hamburger Toggle & Controls -->
    <div class="flex items-center gap-2 md:hidden">
      <!-- Mobile Theme Toggle -->
      <button 
        onclick={toggleTheme}
        class="p-1.5 rounded-full bg-surface-800 border border-white/10 text-gray-300 flex items-center justify-center"
        aria-label="Toggle Light / Dark Mode"
      >
        {#if $currentTheme === 'dark'}
          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <!-- Mobile Language Switcher -->
      <div class="flex items-center p-0.5 rounded-full bg-surface-800 border border-white/10 text-[10px] font-mono">
        <button 
          onclick={() => setLanguage('en')}
          class="px-2 py-0.5 rounded-full transition-all {$currentLang === 'en' ? 'bg-brand-600 text-white font-bold' : 'text-gray-400'}"
        >
          EN
        </button>
        <button 
          onclick={() => setLanguage('id')}
          class="px-2 py-0.5 rounded-full transition-all {$currentLang === 'id' ? 'bg-brand-600 text-white font-bold' : 'text-gray-400'}"
        >
          ID
        </button>
      </div>

      <button 
        onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
        class="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
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
    <div class="md:hidden mt-3 p-4 rounded-2xl bg-surface-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
      {#each navLinks as link}
        <a 
          href={link.href} 
          onclick={() => isMobileMenuOpen = false}
          class="px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          {link.name}
        </a>
      {/each}
      <div class="h-px bg-white/10 my-1"></div>
      <button 
        onclick={() => { isMobileMenuOpen = false; showResumeModal = true; }}
        class="w-full py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all text-center"
      >
        {$t('nav.resume')}
      </button>
    </div>
  {/if}
</header>

<ResumeModal isOpen={showResumeModal} on:close={() => showResumeModal = false} pdfUrl="./resume.pdf" />
