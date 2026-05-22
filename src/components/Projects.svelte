<script lang="ts">
  import { onMount, tick, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import Draggable from 'gsap/Draggable';

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

    Draggable.create(".drag-proxy", {
      type: "x",
      trigger: ".gallery",
      onPress() {
        this.startOffset = scrub.vars.offset;
      },
      onDrag() {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.002;
        scrub.invalidate().restart();
      },
      onDragEnd() {
        scrollToOffset(scrub.vars.offset);
      }
    });

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
  <div class="absolute top-12 left-6 sm:left-12 lg:left-24 z-50">
    <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
      Recent Projects
    </h2>
    <p class="mt-4 text-gray-400">Scroll or swipe to explore.</p>
  </div>

  {#if loading}
    <div class="text-white text-xl">Loading Projects...</div>
  {:else if repos.length === 0}
    <div class="text-white text-xl">No projects found.</div>
  {:else}
    <ul class="cards absolute w-[80vw] max-w-[600px] h-[50vw] max-h-[350px] list-none p-0 m-0" style="top: 50%; left: 50%; transform: translate(-50%, -50%); perspective: 1000px;">
      {#each displayRepos as repo, index}
        <li class="absolute top-0 left-0 w-full h-full will-change-transform flex flex-col justify-end overflow-hidden rounded-2xl border border-surface-700 bg-surface-800 shadow-2xl">
          {#if repo.screenshot}
            <img src={repo.screenshot} alt={repo.name} class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          {/if}
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
          
          <div class="relative z-10 p-6 flex flex-col gap-2 pointer-events-auto">
            <h3 class="text-2xl font-bold text-white">{repo.name}</h3>
            <p class="text-gray-300 text-sm line-clamp-3">{repo.description}</p>
            
            <div class="flex items-center gap-4 mt-4">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-full transition-colors">
                View Project
              </a>
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
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
      <button class="prev-btn px-6 py-2 rounded-full border border-surface-700 bg-surface-800 text-white hover:bg-brand-500 hover:border-brand-500 transition-colors">
        Prev
      </button>
      <button class="next-btn px-6 py-2 rounded-full border border-surface-700 bg-surface-800 text-white hover:bg-brand-500 hover:border-brand-500 transition-colors">
        Next
      </button>
    </div>
  {/if}
</section>

<!-- Resume Button rendered outside the pinned gallery -->
{#if !loading && repos.length > 0}
  <div class="w-full flex justify-center py-24 bg-surface-900 relative z-10">
    <a href="./resume.pdf" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 px-8 py-4 rounded-full bg-surface-800 border border-surface-700 hover:border-brand-500/50 hover:bg-surface-700 transition-all duration-300 shadow-xl hover:shadow-brand-500/20 hover:-translate-y-1 text-gray-200 font-semibold text-lg relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <svg class="w-6 h-6 text-brand-400 group-hover:text-brand-300 transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="relative z-10">View My Resume</span>
    </a>
  </div>
{/if}
