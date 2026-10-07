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
      <!-- Left Column -->
        <div class="flex flex-col gap-8" use:reveal={{ y: 30, duration: 0.8 }}>
          <div class="flex flex-col gap-6">
            <div>
              <div class="text-[10px] font-mono text-amber-700 font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span>ROOT // COMM_CHANNEL_01</span>
              </div>
              <h3 class="display-title-v2 font-bold text-slate-950 flex items-baseline gap-2">
                <span class="text-amber-600 select-none">&gt;</span>
                <span>{$t('contact.title')}</span>
              </h3>
            </div>

            <div class="p-4 bg-white border border-slate-200 rounded-none shadow-sm">
              <div class="text-[10px] font-mono text-amber-700 font-bold mb-1">// TRANSMISSION_PAYLOAD</div>
              <p class="desc-v2 text-slate-700 font-mono">
                {$t('contact.desc')}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 mt-2">
            <div class="p-4 rounded-none border border-slate-200 bg-white flex items-center justify-between gap-4 max-w-md shadow-md">
              <div class="flex items-center gap-3 overflow-hidden">
                <span class="w-2 h-2 bg-emerald-500 inline-block rounded-none shrink-0"></span>
                <div class="flex flex-col truncate">
                  <span class="text-[9px] font-mono text-slate-500 tracking-wider uppercase">[DIRECT_LINK]</span>
                  <span class="font-mono text-xs sm:text-sm text-slate-900 truncate font-bold">
                    {profileData.contact.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onclick={copyEmail}
                class="px-4 py-2 text-xs font-mono font-bold rounded-none bg-slate-900 hover:bg-amber-600 text-white transition-all shrink-0 cursor-pointer"
              >
                {copied ? $t('contact.copied') : $t('contact.copyEmail')}
              </button>
            </div>
          </div>
        </div>

      <!-- Right Column: Terminal Form Panel -->
      <div class="relative" use:reveal={{ y: 50, duration: 1, delay: 0.2 }}>
        <div class="form-panel rounded-none border border-slate-200 bg-white overflow-hidden shadow-lg">
          <!-- Terminal Topbar -->
          <div class="terminal-bar px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-mono text-[11px] text-slate-600">
            <div class="flex items-center gap-3">
              <span class="text-slate-900 font-bold">~/dispatch/contact.sh</span>
            </div>
            <div class="flex items-center gap-2 text-[10px]">
              <span class="w-1.5 h-1.5 bg-emerald-500"></span>
              <span class="text-emerald-700 font-bold">ONLINE</span>
            </div>
          </div>

          <form onsubmit={handleSubmit} class="p-8 sm:p-10 flex flex-col gap-6 rounded-none bg-white">
            <input type="hidden" name="access_key" value={ACCESS_KEY} />
            <input type="hidden" name="subject" value="New Submission from Portfolio" />

            <div class="flex flex-col gap-2">
              <label for="name-v2" class="text-xs font-mono font-semibold text-slate-800">
                <span class="text-amber-700 font-bold">&gt;</span> {$t('contact.nameLabel')}
              </label>
              <input
                type="text"
                id="name-v2"
                name="name"
                required
                placeholder={$t('contact.namePlaceholder')}
                class="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/30 rounded-none px-5 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm font-sans"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="email-v2" class="text-xs font-mono font-semibold text-slate-800">
                <span class="text-amber-700 font-bold">&gt;</span> {$t('contact.emailLabel')}
              </label>
              <input
                type="email"
                id="email-v2"
                name="email"
                required
                placeholder={$t('contact.emailPlaceholder')}
                class="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/30 rounded-none px-5 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm font-sans"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="message-v2" class="text-xs font-mono font-semibold text-slate-800">
                <span class="text-amber-700 font-bold">&gt;</span> {$t('contact.messageLabel')}
              </label>
              <textarea
                id="message-v2"
                name="message"
                required
                rows="4"
                placeholder={$t('contact.messagePlaceholder')}
                class="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/30 rounded-none px-5 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition-all resize-y min-h-[120px] text-sm font-sans"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              class="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-none px-6 py-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              {#if status === "loading"}
                <span class="flex items-center justify-center gap-2" in:fade>
                  {$t('contact.sending')}
                </span>
              {:else if status === "success"}
                <span class="flex items-center justify-center gap-2 text-white font-bold" in:fade>
                  {$t('contact.successMsg')}
                </span>
              {:else if status === "error"}
                <span class="flex items-center justify-center gap-2 text-red-200" in:fade>
                  Error. Try again.
                </span>
              {:else}
                <span class="flex items-center justify-center gap-2" in:fade>
                  [DISPATCH] {$t('contact.sendBtn')}
                </span>
              {/if}
            </button>
          </form>
        </div>
      </div>
    </div>
</section>

<style>
  .display-title-v2 {
    font-size: calc(clamp(2.15rem, 4.5vw, 3.5rem) * 0.9);
    line-height: 1.15;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.05em;
  }
  .desc-v2 {
    font-size: calc(0.95rem * 0.9);
    line-height: 1.8;
    max-width: 54ch;
  }
</style>
