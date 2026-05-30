<script lang="ts">
  import { onMount } from 'svelte';
  
  let innerCursor: HTMLElement;
  let outerCursor: HTMLElement;
  
  let mouseX = -100; // start off-screen
  let mouseY = -100;
  
  let outerX = -100;
  let outerY = -100;
  
  let isHovering = $state(false);

  onMount(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (innerCursor) {
        innerCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let reqId: number;
    const animateOuterCursor = () => {
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      
      if (outerCursor) {
        outerCursor.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
      }
      reqId = requestAnimationFrame(animateOuterCursor);
    };
    
    animateOuterCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  });
</script>

<div class="hidden lg:block">
  <div
    bind:this={innerCursor}
    class="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform {isHovering ? 'scale-[2] opacity-50' : 'scale-100 opacity-100'} transition-transform duration-300"
  ></div>

  <div
    bind:this={outerCursor}
    class="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border border-white/40 rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform transition-all duration-300 {isHovering ? 'scale-150 border-white/10 bg-white/10' : 'scale-100'}"
  ></div>
</div>
