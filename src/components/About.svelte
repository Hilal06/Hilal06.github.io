<script lang="ts">
  import profileData from '../data/profile.json';
  import { reveal } from '../lib/actions';
</script>

<section id="about" class="py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
    <div class="lg:col-span-4 flex items-center" use:reveal={{ y: 30, duration: 0.8 }}>
      <h2 class="text-xs tracking-[0.3em] uppercase text-brand-400 font-semibold flex items-center gap-4">
        <span class="w-12 h-[1px] bg-brand-400"></span>
        About Me
      </h2>
    </div>
    
    <div class="lg:col-span-8" use:reveal={{ y: 40, duration: 1, delay: 0.1 }}>
      <h3 class="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-300 leading-[1.3] tracking-tight">
        I am an <span class="font-bold text-white tracking-normal">{profileData.title}</span> obsessed with crafting digital experiences that are not only highly performant but beautifully designed. 
      </h3>
      <p class="mt-8 text-base sm:text-lg text-gray-400 max-w-3xl leading-relaxed font-light">
        {profileData.aboutMe}
      </p>
    </div>
  </div>
</section>
