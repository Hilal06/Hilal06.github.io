<script lang="ts">
  import type { GitHubProfile } from '../lib/github';
  
  export let profile: GitHubProfile | null = null;
</script>

<section class="py-24 px-6 sm:px-12 lg:px-24 flex flex-col items-center justify-center min-h-[70vh] text-center">
  {#if profile}
    <div class="relative group">
      <div class="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-300 rounded-full opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
      <img 
        src={profile.avatar_url} 
        alt={profile.name} 
        class="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-surface-700 shadow-xl object-cover"
      />
    </div>
    
    <h1 class="mt-8 text-4xl md:text-6xl font-bold tracking-tight text-white">
      Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">{profile.name || profile.login}</span>
    </h1>
    
    <p class="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
      {profile.bio || 'A passionate software developer building modern web applications.'}
    </p>

    <div class="mt-10 flex gap-4">
      <a href={profile.html_url} target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors shadow-lg shadow-brand-500/20">
        View GitHub
      </a>
      <a href="#projects" class="px-6 py-3 rounded-lg bg-surface-700 hover:bg-surface-600 text-gray-200 font-medium transition-colors border border-surface-600">
        Explore Work
      </a>
    </div>
  {:else}
    <div class="animate-pulse flex flex-col items-center">
      <div class="w-32 h-32 bg-surface-700 rounded-full"></div>
      <div class="h-10 w-64 bg-surface-700 rounded mt-8"></div>
      <div class="h-6 w-96 bg-surface-700 rounded mt-6"></div>
    </div>
  {/if}
</section>
