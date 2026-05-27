<script lang="ts">
  import profileData from '../data/profile.json';
</script>

<section id="about" class="py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
    <div class="lg:col-span-4 flex items-center">
      <h2 class="text-xs tracking-[0.3em] uppercase text-brand-400 font-semibold flex items-center gap-4">
        <span class="w-12 h-[1px] bg-brand-400"></span>
        About Me
      </h2>
    </div>
    
    <div class="lg:col-span-8">
      <h3 class="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-200 leading-[1.4] tracking-tight">
        I am an <span class="font-semibold text-white">{profileData.title}</span> obsessed with crafting digital experiences that are not only highly performant but beautifully designed. 
      </h3>
      <p class="mt-8 text-base sm:text-lg text-gray-400 max-w-3xl leading-relaxed font-light">
        {profileData.aboutMe}
      </p>
    </div>
  </div>
</section>
