<script lang="ts">
  import profileData from '../data/profile.json';
  import { magnetic } from '../lib/actions';
  import { t } from '../lib/i18n';

  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>

<footer class="border-t border-white/10 bg-surface-900 z-10 relative">
  <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-10 flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-400 font-light">
      <div class="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
        <p>&copy; {currentYear} <span class="text-white font-medium">{profileData.fullName}</span>. All rights reserved.</p>
        <span class="hidden sm:inline text-gray-600">•</span>
        <span class="text-xs font-mono px-3 py-1 rounded-full bg-surface-800 border border-white/10 text-brand-300">
          {$t('footer.builtWith')}
        </span>
      </div>

      <div class="flex items-center gap-6">
        <a href="https://github.com/Hilal06" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub</a>
        <a href={`mailto:${profileData.contact.email}`} class="hover:text-white transition-colors">Email</a>
        
        <button 
          use:magnetic
          onclick={scrollToTop}
          class="magnetic-btn p-2.5 rounded-full bg-surface-800 border border-white/10 hover:bg-brand-600 hover:text-white text-gray-300 transition-all ml-2"
          aria-label="Scroll back to top"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</footer>
