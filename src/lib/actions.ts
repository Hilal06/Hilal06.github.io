import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function reveal(node: HTMLElement, { delay = 0, y = 50, duration = 1, ease = "power3.out" } = {}) {
  // Set initial state immediately to avoid flashing
  gsap.set(node, { opacity: 0, y });

  const animation = gsap.to(node, {
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: node,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  return {
    destroy() {
      animation.kill();
    }
  };
}

export function magnetic(node: HTMLElement, strength = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = node.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    gsap.to(node, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(node, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  node.addEventListener('mousemove', handleMouseMove);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    }
  };
}
