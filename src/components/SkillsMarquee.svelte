<script lang="ts">
  import { reveal } from '../lib/actions';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  const skills = [
    {
      name: "Svelte",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "Arduino",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
    },
    {
      name: "Debian",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg",
    },
    {
      name: "Ubuntu Server",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
    },
    {
      name: "Fedora",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fedora/fedora-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    },
    {
      name: "Podman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/podman/podman-original.svg",
    },
    {
      name: "MQTT",
      icon: "https://cdn.simpleicons.org/mqtt",
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    },
    {
      name: "Kotlin",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    },
    // { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  ];

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...skills, ...skills, ...skills, ...skills];

  let selectedSkill: any = null;
  let isModalOpen = false;

  function openModal(skill: any) {
    selectedSkill = skill;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    setTimeout(() => { selectedSkill = null; }, 300);
  }
</script>

<section
  use:reveal={{ y: 50, duration: 1, delay: 0.2 }}
  class="w-full py-8 sm:py-12 border-y border-surface-800 bg-surface-900/50 backdrop-blur-sm overflow-hidden relative z-10"
>
  <!-- Gradient Masks for seamless fade on edges -->
  <div
    class="absolute inset-y-0 left-0 w-20 sm:w-48 bg-gradient-to-r from-surface-900 to-transparent z-10 pointer-events-none"
  ></div>
  <div
    class="absolute inset-y-0 right-0 w-20 sm:w-48 bg-gradient-to-l from-surface-900 to-transparent z-10 pointer-events-none"
  ></div>

  <div class="flex whitespace-nowrap animate-marquee">
    {#each marqueeItems as skill, i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="flex items-center justify-center gap-3 px-8 sm:px-12 group cursor-pointer transition-transform hover:scale-110"
        on:click={() => openModal(skill)}
      >
        <img
          src={skill.icon}
          alt="{skill.name} icon"
          class="w-8 h-8 sm:w-10 sm:h-10 opacity-60 group-hover:opacity-100 transition-opacity drop-shadow-md grayscale group-hover:grayscale-0 duration-300"
        />
        <span
          class="text-lg sm:text-xl font-medium text-gray-500 group-hover:text-brand-300 transition-colors duration-300"
        >
          {skill.name}
        </span>
      </div>
    {/each}
  </div>
</section>

<!-- Proficiency Modal -->
{#if isModalOpen && selectedSkill}
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      transition:fade={{ duration: 300, easing: cubicOut }}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-md" 
        on:click={closeModal}
      ></div>

      <!-- Modal Content -->
      <div 
        class="relative w-full max-w-sm bg-surface-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 flex flex-col items-center text-center z-10"
        transition:fly={{ y: 20, duration: 400, easing: cubicOut }}
      >
        <!-- Close Button -->
        <button 
          on:click={closeModal}
          class="absolute top-4 right-4 p-2 bg-black/50 hover:bg-brand-500 rounded-full text-white backdrop-blur-sm transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Icon & Content -->
        <div class="w-20 h-20 mb-6 bg-surface-800 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
          <img src={selectedSkill.icon} alt={selectedSkill.name} class="w-12 h-12 drop-shadow-md" />
        </div>
        
        <h3 class="text-2xl font-bold text-white mb-3">{selectedSkill.name}</h3>
        
        <div class="w-8 h-[2px] bg-brand-500 mb-4 rounded-full"></div>
        
        <p class="text-gray-400 text-sm leading-relaxed">
          I have extensive experience leveraging <strong class="text-gray-200">{selectedSkill.name}</strong> to build scalable, high-performance solutions and efficient development workflows.
        </p>
        
      </div>
    </div>
  {/if}

<style>
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-marquee {
    /* Since we have 4 copies, translating -50% shifts by exactly 2 copies, allowing a seamless loop */
    animation: marquee 40s linear infinite;
    width: max-content;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }
</style>
