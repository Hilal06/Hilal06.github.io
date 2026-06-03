<script lang="ts">
  import profileData from "../data/profile.json";
  import { reveal } from "../lib/actions";

  const programmingTools = [
    "PHP",
    "C++",
    "Javascript",
    "NodeJS",
    "Python",
    "Arduino",
    "Kotlin",
    "PostgreSQL",
    "Java",
    "MySQL",
    "Laravel",
    "Docker",
    "Kubernetes",
    "AWS",
    "Ubuntu Server",
  ];

  const certificates = ["Microsoft Office", "TOEIC", "TOEFL"];
</script>

<section
  id="about"
  class="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 flex flex-col items-center"
>
  <!-- Centered Header -->
  <div
    class="text-center mb-16 sm:mb-24 flex flex-col items-center"
    use:reveal={{ y: 30, duration: 1 }}
  >
    <h2
      class="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4"
    >
      About<span class="text-purple-500">.</span>
    </h2>
    <p
      class="text-gray-400 text-sm sm:text-base uppercase tracking-[0.2em] font-medium"
    >
      Skills & Journey
    </p>
  </div>

  <!-- Two Column Layout -->
  <div
    class="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
  >
    <!-- Left Column: Bio -->
    <div
      class="flex flex-col gap-6"
      use:reveal={{ y: 40, duration: 1, delay: 0.2 }}
    >
      <!-- The bio is sourced directly from your profile.json. To add paragraph breaks like the screenshot, 
           you can update profile.json to use an array of strings, or just keep it as a single block here. -->
      <p class="text-base md:text-lg text-gray-400 leading-[1.8] font-light">
        {profileData.aboutMe}
      </p>
    </div>

    <!-- Right Column: Skills & Tools -->
    <div
      class="flex flex-col gap-12"
      use:reveal={{ y: 40, duration: 1, delay: 0.4 }}
    >
      <!-- Programming & Tools -->
      <div>
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <svg
            class="w-7 h-7 text-brand-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
          Programming & Tools
        </h3>
        <div class="flex flex-wrap gap-3">
          {#each programmingTools as tool}
            <span
              class="px-5 py-2.5 bg-surface-800/60 backdrop-blur-sm border border-surface-700 rounded-full text-sm sm:text-base text-gray-300 font-medium hover:border-brand-500 hover:text-white transition-all cursor-default shadow-sm hover:shadow-brand-500/20"
            >
              {tool}
            </span>
          {/each}
        </div>
      </div>

      <!-- Certificates -->
      <div>
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <svg
            class="w-7 h-7 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            ></path>
          </svg>
          Certificates
        </h3>
        <div class="flex flex-wrap gap-3">
          {#each certificates as cert}
            <span
              class="px-5 py-2.5 bg-surface-800/60 backdrop-blur-sm border border-surface-700 rounded-full text-sm sm:text-base text-gray-300 font-medium hover:border-purple-500 hover:text-white transition-all cursor-default shadow-sm hover:shadow-purple-500/20"
            >
              {cert}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
