<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import gsap from 'gsap';

  export let loading: boolean = true;
  const dispatch = createEventDispatcher();

  let progress = 0;
  let containerRef: HTMLDivElement;
  let textRef: HTMLDivElement;

  onMount(() => {
    // Artificial loading animation
    // Animate progress to 90% over 1.5 seconds minimum to ensure it looks good
    gsap.to({ val: 0 }, {
      val: 90,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: function() {
        progress = Math.floor(this.targets()[0].val);
      }
    });
  });

  $: if (!loading && containerRef) {
    // Finish loading and animate out
    gsap.to({ val: progress }, {
      val: 100,
      duration: 0.4,
      ease: "power2.inOut",
      onUpdate: function() {
        progress = Math.floor(this.targets()[0].val);
      },
      onComplete: () => {
        // Fade and slide text out
        gsap.to(textRef, {
          y: -50,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        });
        
        // Slide container up to reveal the site
        gsap.to(containerRef, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete: () => {
            dispatch('complete');
          }
        });
      }
    });
  }
</script>

<div bind:this={containerRef} class="fixed inset-0 z-[9999] bg-surface-900 flex items-center justify-center overflow-hidden">
  <!-- Subtle background glow for aesthetics -->
  <div class="absolute inset-0 bg-brand-500/5 blur-[150px] pointer-events-none"></div>
  
  <div bind:this={textRef} class="relative text-7xl md:text-9xl font-black tracking-tighter tabular-nums flex items-baseline">
    <span class="text-transparent bg-clip-text bg-gradient-to-br from-brand-300 via-purple-300 to-brand-500">{progress}</span>
    <span class="text-4xl md:text-6xl text-brand-400 ml-1 opacity-50">%</span>
  </div>
</div>
