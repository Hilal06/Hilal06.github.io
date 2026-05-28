<script lang="ts">
  import { onMount, tick, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import Draggable from 'gsap/Draggable';
  import ProjectModal from './ProjectModal.svelte';
  import { magnetic, reveal } from '../lib/actions';

  export let repos: any[] = [];
  export let loading: boolean = true;

  // We need enough DOM elements so GSAP tweens overlap correctly without overwriting.
  // The animation duration is 1 and spacing is 0.1, meaning 10 items can be on screen at once.
  // We duplicate the repos until we have at least 15-20 items.
  let displayRepos: any[] = [];
  $: {
    if (repos && repos.length > 0) {
      displayRepos = [...repos];
      while (displayRepos.length < 18) {
        displayRepos = [...displayRepos, ...repos];
      }
    }
  }

  let selectedProject: any = null;
  let isModalOpen: boolean = false;

  function openModal(project: any) {
    selectedProject = project;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    setTimeout(() => selectedProject = null, 300); // clear after animation finishes
  }

  let gsapInitialized = false;
  let cleanupGsap: () => void;

  $: if (!loading && repos.length > 0 && !gsapInitialized) {
    gsapInitialized = true;
    tick().then(initGsap);
  }

  function initGsap() {

    gsap.registerPlugin(Draggable);

    const cards = gsap.utils.toArray('.cards li');
    if (cards.length === 0) return;

    let iteration = 0;
    gsap.set('.cards li', {xPercent: 400, opacity: 0, scale: 0});

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);

    const animateFunc = (element: any) => {
      const tl = gsap.timeline();
      tl.fromTo(element, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false})
        .fromTo(element, {xPercent: 400}, {xPercent: -400, duration: 1, ease: "none", immediateRender: false}, 0);
      return tl;
    };

    function buildSeamlessLoop(items: any[], spacing: number, animateFunc: Function) {
      let rawSequence = gsap.timeline({paused: true}),
        seamlessLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            this._time === this._dur && (this._tTime += this._dur - 0.01);
          },
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 100);
          }
        }),
        cycleDuration = spacing * items.length,
        dur = 0;

      items.concat(items).concat(items).forEach((item, i) => {
        let anim = animateFunc(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
        dur || (dur = anim.duration());
      });

      seamlessLoop.fromTo(rawSequence, {
        time: cycleDuration + dur / 2
      }, {
        time: "+=" + cycleDuration,
        duration: cycleDuration,
        ease: "none"
      });
      return seamlessLoop;
    }

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    const playhead = {offset: 0};
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    
    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: "power3",
      paused: true
    });

    function scrollToOffset(offset: number) {
      let snapped = snapTime(offset);
      scrub.vars.offset = snapped;
      scrub.invalidate().restart();
    }

    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    const handleNext = () => scrollToOffset(scrub.vars.offset + spacing);
    const handlePrev = () => scrollToOffset(scrub.vars.offset - spacing);

    if (nextBtn) nextBtn.addEventListener('click', handleNext);
    if (prevBtn) prevBtn.addEventListener('click', handlePrev);

    // Initialize position
    seamlessLoop.time(wrapTime(0));

    cleanupGsap = () => {
      scrub.kill();
      seamlessLoop.kill();
      if (nextBtn) nextBtn.removeEventListener('click', handleNext);
      if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
    };
  }

  onDestroy(() => {
    if (cleanupGsap) cleanupGsap();
  });
</script>

<section id="projects" class="gallery relative w-full h-screen overflow-hidden bg-surface-900 z-10 flex items-center justify-center">
  <!-- Wrapper to match About and Contact layout alignment -->
  <div class="absolute inset-0 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pointer-events-none z-50">
    <div class="absolute top-16 sm:top-24 pointer-events-auto" use:reveal={{ y: 30, duration: 1 }}>
      <h2 class="text-xs tracking-[0.3em] uppercase text-brand-400 font-semibold flex items-center gap-4 mb-4">
        <span class="w-12 h-[1px] bg-brand-400"></span>
        Projects
      </h2>
      <h3 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
        Selected Work
      </h3>
      <p class="mt-2 text-sm text-gray-400 max-w-[200px]">Scroll or swipe to explore.</p>
    </div>
  </div>

  {#if loading}
    <div class="text-white text-xl">Loading Projects...</div>
  {:else if repos.length === 0}
    <div class="text-white text-xl">No projects found.</div>
  {:else}
    <ul class="cards absolute w-[80vw] max-w-[600px] h-[50vw] max-h-[350px] list-none p-0 m-0" style="top: 50%; left: 50%; transform: translate(-50%, -50%); perspective: 1000px;">
      {#each displayRepos as repo, index}
        <li class="group absolute top-0 left-0 w-full h-full will-change-transform flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-surface-800/60 backdrop-blur-xl shadow-2xl hover:border-brand-500/50 hover:shadow-brand-500/30 transition-all duration-300">
          {#if repo.screenshot}
            <img src={repo.screenshot} alt={repo.name} class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          {/if}
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
          
          <div class="relative z-10 p-6 flex flex-col gap-2 pointer-events-auto">
            <div class="flex justify-between items-start gap-2">
              <h3 class="text-2xl font-bold text-white truncate">{repo.name}</h3>
              {#if repo.isPrivate !== undefined}
                <span class="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full shrink-0 mt-1.5 {repo.isPrivate ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'}">
                  {repo.isPrivate ? 'Private' : 'Public'}
                </span>
              {/if}
            </div>
            <p class="text-gray-300 text-sm line-clamp-3">{repo.description}</p>
            
            <div class="flex items-center gap-4 mt-4">
              <button use:magnetic on:click={() => openModal(repo)} class="magnetic-btn px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-500/30">
                View Details
              </button>
              {#if repo.language}
                <div class="flex items-center gap-1.5 text-xs text-gray-400 font-medium ml-auto">
                  <span class="w-2.5 h-2.5 rounded-full bg-brand-400"></span>
                  {repo.language}
                </div>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
    
    <!-- Proxy element for dragging calculation -->
    <div class="drag-proxy hidden"></div>

    <!-- Prev / Next Buttons -->
    <div class="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
      <button use:magnetic class="prev-btn magnetic-btn px-6 py-2 rounded-full border border-white/10 bg-surface-800/60 backdrop-blur-md text-gray-200 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all shadow-lg">
        Prev
      </button>
      <button use:magnetic class="next-btn magnetic-btn px-6 py-2 rounded-full border border-white/10 bg-surface-800/60 backdrop-blur-md text-gray-200 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all shadow-lg">
        Next
      </button>
    </div>
  {/if}
</section>



<ProjectModal 
  project={selectedProject} 
  isOpen={isModalOpen} 
  on:close={closeModal} 
/>

