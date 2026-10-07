<script lang="ts">
  import { onMount } from 'svelte';
  
  let orb: HTMLElement;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  
  onMount(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let reqId: number;
    const animate = () => {
      // Extremely slow lerp for the background orb
      currentX += (mouseX - currentX) * 0.03;
      currentY += (mouseY - currentY) * 0.03;
      
      if (orb) {
        orb.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      reqId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  });
</script>

<div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
  <div
    bind:this={orb}
    class="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] md:blur-[140px] bg-gradient-to-tr from-[var(--color-accent-500)]/10 via-[var(--color-accent-200)]/8 to-transparent opacity-50 will-change-transform mix-blend-multiply"
  ></div>
</div>
