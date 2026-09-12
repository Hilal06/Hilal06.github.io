<script lang="ts">
  import { reveal } from '../lib/actions';
  
  const skills = [
    {
      name: "Kotlin",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    },
    {
      name: "Android Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
    },
    {
      name: "Supabase",
      icon: "https://cdn.simpleicons.org/supabase",
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    },
    {
      name: "Svelte 5",
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
      name: "Tailwind CSS v4",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    },
    {
      name: "C++ / Arduino",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    },
    {
      name: "RabbitMQ",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      name: "Ubuntu Server",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
    },
    {
      name: "MQTT",
      icon: "https://cdn.simpleicons.org/mqtt",
    }
  ];

  // Duplicate the array for a seamless infinite loop
  const marqueeItems = [...skills, ...skills, ...skills];
</script>

<!-- Pure Aesthetic Decorative Ticker -->
<section
  id="marquee"
  use:reveal={{ y: 50, duration: 1, delay: 0.2 }}
  class="marquee-container w-full py-8 border-y border-white/10 bg-surface-900/50 backdrop-blur-sm overflow-hidden relative z-10 select-none pointer-events-none"
>
  <!-- Gradient Masks for edge fading -->
  <div
    class="marquee-mask-left absolute inset-y-0 left-0 w-20 sm:w-48 bg-gradient-to-r from-surface-900 to-transparent z-10 pointer-events-none"
  ></div>
  <div
    class="marquee-mask-right absolute inset-y-0 right-0 w-20 sm:w-48 bg-gradient-to-l from-surface-900 to-transparent z-10 pointer-events-none"
  ></div>

  <div class="flex whitespace-nowrap animate-marquee">
    {#each marqueeItems as skill}
      <div
        class="flex items-center justify-center gap-3 px-8 sm:px-10 group"
      >
        <img
          src={skill.icon}
          alt="{skill.name} icon"
          class="marquee-icon w-7 h-7 sm:w-8 sm:h-8 opacity-70 group-hover:opacity-100 transition-all drop-shadow-md duration-300"
        />
        <span
          class="marquee-text text-sm sm:text-base font-mono font-medium text-gray-300 group-hover:text-brand-300 transition-colors duration-300"
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
      transform: translateX(-33.333%);
    }
  }

  .animate-marquee {
    animation: marquee 40s linear infinite;
    width: max-content;
  }
</style>
