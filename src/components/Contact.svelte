<script lang="ts">
  import { fade } from "svelte/transition";
  import { reveal } from "../lib/actions";
  import profileData from "../data/profile.json";
  import { t } from "../lib/i18n";

  const ACCESS_KEY = "32d536ac-693d-46d1-bc10-24ef9c832356";

  let status = $state<"idle" | "loading" | "success" | "error">("idle");
  let copied = $state(false);

  function copyEmail() {
    navigator.clipboard.writeText(profileData.contact.email);
    copied = true;
    setTimeout(() => copied = false, 2500);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    status = "loading";

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        status = "success";
        form.reset();
        setTimeout(() => {
          status = "idle";
        }, 5000);
      } else {
        status = "error";
        console.error("Form submission failed:", data);
        setTimeout(() => (status = "idle"), 5000);
      }
    } catch (error) {
      status = "error";
      console.error("Error submitting form:", error);
      setTimeout(() => (status = "idle"), 5000);
    }
  }
</script>

<section
  id="contact"
  class="py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 w-full overflow-hidden"
>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
    <!-- Left Column: Copy & Info -->
    <div class="flex flex-col gap-8" use:reveal={{ y: 30, duration: 0.8 }}>
      <div>
        <h2
          class="text-xs font-mono tracking-[0.3em] uppercase text-brand-400 font-semibold flex items-center gap-4 mb-6"
        >
          <span class="w-12 h-[1px] bg-brand-400"></span>
          {$t('contact.subtitle')}
        </h2>
        <h3
          class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
        >
          {$t('contact.title')}
        </h3>
      </div>

      <p class="text-base sm:text-lg text-gray-300 leading-relaxed max-w-md">
        {$t('contact.desc')}
      </p>

      <!-- Direct Contact Methods & Copy Box -->
      <div class="flex flex-col gap-4 mt-2">
        <!-- Interactive Email Copy Widget -->
        <div class="p-4 rounded-2xl border border-white/10 bg-surface-800/80 backdrop-blur-xl flex items-center justify-between gap-4 max-w-md">
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2" stroke-width="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke-width="2"></path>
              </svg>
            </div>
            <span class="font-mono text-xs sm:text-sm text-gray-200 truncate font-medium">
              {profileData.contact.email}
            </span>
          </div>

          <button
            type="button"
            onclick={copyEmail}
            class="px-4 py-2 text-xs font-mono font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-all shrink-0 shadow-md"
          >
            {copied ? $t('contact.copied') : $t('contact.copyEmail')}
          </button>
        </div>
      </div>
    </div>

    <!-- Right Column: Form -->
    <div class="relative" use:reveal={{ y: 50, duration: 1, delay: 0.2 }}>
      <div
        class="absolute -inset-4 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 pointer-events-none"
      ></div>

      <form
        onsubmit={handleSubmit}
        class="relative bg-surface-800/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col gap-6"
      >
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        <input
          type="hidden"
          name="subject"
          value="New Submission from Portfolio"
        />

        <div class="flex flex-col gap-2">
          <label for="name" class="text-xs font-mono font-medium text-gray-300 ml-1"
            >{$t('contact.nameLabel')}</label
          >
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder={$t('contact.namePlaceholder')}
            class="w-full bg-surface-900 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 text-sm"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="email" class="text-xs font-mono font-medium text-gray-300 ml-1"
            >{$t('contact.emailLabel')}</label
          >
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={$t('contact.emailPlaceholder')}
            class="w-full bg-surface-900 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 text-sm"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="message" class="text-xs font-mono font-medium text-gray-300 ml-1"
            >{$t('contact.messageLabel')}</label
          >
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            placeholder={$t('contact.messagePlaceholder')}
            class="w-full bg-surface-900 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 resize-y min-h-[120px] text-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          class="w-full mt-2 relative overflow-hidden group bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl px-6 py-4 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98]"
        >
          {#if status === "loading"}
            <span class="flex items-center justify-center gap-2" in:fade>
              <svg
                class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {$t('contact.sending')}
            </span>
          {:else if status === "success"}
            <span class="flex items-center justify-center gap-2" in:fade>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {$t('contact.successMsg')}
            </span>
          {:else if status === "error"}
            <span
              class="flex items-center justify-center gap-2 text-red-100"
              in:fade
            >
              Error. Try again.
            </span>
          {:else}
            <span class="flex items-center justify-center gap-2" in:fade>
              {$t('contact.sendBtn')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
          {/if}
        </button>
      </form>
    </div>
  </div>
</section>
