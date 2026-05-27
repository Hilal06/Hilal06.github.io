<script lang="ts">
  import profileData from '../data/profile.json';
  const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-surface-800 bg-surface-900 z-10 relative">
  <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8">
    <div class="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 font-light">
      <p>&copy; {currentYear} {profileData.fullName}. All rights reserved.</p>
      <div class="mt-4 sm:mt-0 flex gap-6">
        <a href="https://github.com/Hilal06" target="_blank" rel="noopener noreferrer" class="hover:text-gray-300 transition-colors">GitHub</a>
        <a href={`https://wa.me/${profileData.contact.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" class="hover:text-gray-300 transition-colors">WhatsApp</a>
        <a href={`mailto:${profileData.contact.email}`} class="hover:text-gray-300 transition-colors">Email</a>
      </div>
    </div>
  </div>
</footer>
