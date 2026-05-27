<script lang="ts">
  import { reveal } from '../lib/actions';
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
      <div
        class="flex items-center justify-center gap-3 px-8 sm:px-12 group cursor-pointer transition-transform hover:scale-110"
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
