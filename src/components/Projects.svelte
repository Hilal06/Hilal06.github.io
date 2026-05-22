<script lang="ts">
  import type { GitHubRepo } from '../lib/github';
  
  export let repos: GitHubRepo[] = [];
  export let loading: boolean = true;
</script>

<section id="projects" class="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
  <div class="mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Recent Projects</h2>
    <p class="mt-4 text-gray-400">My latest 4 updated repositories on GitHub.</p>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each Array(4) as _}
        <div class="h-48 bg-surface-800 rounded-2xl animate-pulse border border-surface-700"></div>
      {/each}
    </div>
  {:else if repos.length === 0}
    <div class="py-12 text-center text-gray-500 bg-surface-800/50 rounded-2xl border border-surface-700">
      No repositories found.
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each repos as repo}
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          class="group block p-6 bg-surface-800 rounded-2xl border border-surface-700 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-semibold text-gray-200 group-hover:text-brand-300 transition-colors">
              {repo.name}
            </h3>
            
            <p class="mt-3 text-gray-400 text-sm line-clamp-2 min-h-[2.5rem]">
              {repo.description || 'No description provided.'}
            </p>
            
            <div class="mt-6 flex items-center gap-4 text-xs font-medium text-gray-500">
              {#if repo.language}
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-brand-400"></span>
                  {repo.language}
                </div>
              {/if}
              
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {repo.stargazers_count}
              </div>
              
              <div class="ml-auto text-gray-600">
                {new Date(repo.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
