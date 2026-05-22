<script lang="ts">
  export let repos: any[] = [];
  export let loading: boolean = true;
</script>

<section id="projects" class="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
  <div class="mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
      Recent Projects
    </h2>
    <p class="mt-4 text-gray-400">My latest projects and selected work.</p>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each Array(4) as _}
        <div
          class="h-48 bg-surface-800 rounded-2xl animate-pulse border border-surface-700"
        ></div>
      {/each}
    </div>
  {:else if repos.length === 0}
    <div
      class="py-12 text-center text-gray-500 bg-surface-800/50 rounded-2xl border border-surface-700"
    >
      No repositories found.
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each repos as repo}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          class="group block bg-surface-800 rounded-2xl border border-surface-700 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 relative overflow-hidden flex flex-col"
        >
          {#if repo.screenshot}
            <div class="h-48 overflow-hidden relative border-b border-surface-700 shrink-0">
              <img src={repo.screenshot} alt={repo.name} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-surface-800 to-transparent opacity-80"></div>
            </div>
          {/if}

          <div class="p-6 relative z-10 flex-grow flex flex-col">
            <div
              class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            
            <h3
              class="text-xl font-semibold text-gray-200 group-hover:text-brand-300 transition-colors"
            >
              {repo.name}
            </h3>

            <p class="mt-3 text-gray-400 text-sm line-clamp-2 min-h-[2.5rem] flex-grow">
              {repo.description || "No description provided."}
            </p>

            <div
              class="mt-6 flex items-center gap-4 text-xs font-medium text-gray-500 pt-4 border-t border-surface-700/50"
            >
              {#if repo.language}
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-brand-400"></span>
                  {repo.language}
                </div>
              {/if}



              <div class="ml-auto text-gray-600">
                {new Date(repo.updated_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Resume Button -->
    <div class="mt-16 flex justify-center">
      <a href="./resume.pdf" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 px-8 py-4 rounded-full bg-surface-800 border border-surface-700 hover:border-brand-500/50 hover:bg-surface-700 transition-all duration-300 shadow-xl hover:shadow-brand-500/20 hover:-translate-y-1 text-gray-200 font-semibold text-lg relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg class="w-6 h-6 text-brand-400 group-hover:text-brand-300 transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="relative z-10">View My Resume</span>
      </a>
    </div>
  {/if}
</section>
