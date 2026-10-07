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
    setTimeout(() => (copied = false), 2500);
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
          <div
            class="text-[10px] font-mono text-[var(--color-accent-500)] font-bold tracking-widest uppercase mb-2 flex items-center gap-2"
          >
            <span>04 — COMM_CHANNEL</span>
          </div>
          <h3
            class="display-title-v2 font-bold text-[var(--color-ink-primary)] flex items-baseline gap-2"
          >
            <span>{$t("contact.title")}</span>
          </h3>
        </div>

        <div
          class="p-4 bg-[var(--color-surface-overlay)] border border-[var(--color-border)] shadow-sm"
        >
          <div
            class="text-[10px] font-mono text-[var(--color-accent-500)] font-bold mb-1"
          >
            // TRANSMISSION_PAYLOAD
          </div>
          <p class="desc-v2 text-[var(--color-ink-secondary)] font-mono">
            {$t("contact.desc")}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-2">
        <div
          class="p-4 border border-[var(--color-border)] bg-[var(--color-surface-overlay)] flex items-center justify-between gap-4 max-w-md shadow-md"
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <span
              class="w-2 h-2 bg-[var(--color-status-ok)] inline-block shrink-0"
            ></span>
            <div class="flex flex-col truncate">
              <span
                class="text-[9px] font-mono text-[var(--color-ink-muted)] tracking-wider uppercase"
                >[DIRECT_LINK]</span
              >
              <span
                class="font-mono text-xs sm:text-sm text-[var(--color-ink-primary)] truncate font-bold"
              >
                {profileData.contact.email}
              </span>
            </div>
          </div>

          <button
            type="button"
            onclick={copyEmail}
            class="px-4 py-2 text-xs font-mono font-bold bg-[var(--color-ink-primary)] hover:bg-[var(--color-accent-500)] text-white transition-all shrink-0 cursor-pointer"
          >
            {copied ? $t("contact.copied") : $t("contact.copyEmail")}
          </button>
        </div>
      </div>
    </div>

    <!-- Right Column: Terminal Form Panel -->
    <div class="relative" use:reveal={{ y: 50, duration: 1, delay: 0.2 }}>
        <div class="terminal-form-v1 overflow-hidden font-mono text-left">
          <!-- Terminal Topbar -->
          <div class="tf-v1-header px-6 py-3 flex items-center justify-between text-[11px] select-none">
            <div class="flex items-center gap-3">
              <span class="tf-v1-dot w-2 h-2 inline-block"></span>
              <span class="font-bold tracking-wider text-stone-200">~/bin/dispatch-msg.sh</span>
            </div>
            <div class="flex items-center gap-2 text-[10px]">
              <span class="w-1.5 h-1.5 bg-emerald-400"></span>
              <span class="text-emerald-400 font-bold tracking-wider">ONLINE</span>
            </div>
          </div>

          <form onsubmit={handleSubmit} class="tf-v1-form p-8 sm:p-10 flex flex-col gap-6">
            <input type="hidden" name="access_key" value={ACCESS_KEY} />
            <input type="hidden" name="subject" value="New Submission from Portfolio" />

            <div class="flex flex-col gap-2">
              <label for="v1-name" class="text-xs font-semibold text-stone-300 flex items-center gap-2">
                <span class="text-[#e05730] font-bold">&gt;</span> {$t("contact.nameLabel")}
              </label>
              <input
                type="text"
                id="v1-name"
                name="name"
                required
                placeholder={$t("contact.namePlaceholder")}
                class="tf-v1-input w-full px-5 py-3.5 text-sm font-sans placeholder-stone-500 transition-all"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="v1-email" class="text-xs font-semibold text-stone-300 flex items-center gap-2">
                <span class="text-[#e05730] font-bold">&gt;</span> {$t("contact.emailLabel")}
              </label>
              <input
                type="email"
                id="v1-email"
                name="email"
                required
                placeholder={$t("contact.emailPlaceholder")}
                class="tf-v1-input w-full px-5 py-3.5 text-sm font-sans placeholder-stone-500 transition-all"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="v1-message" class="text-xs font-semibold text-stone-300 flex items-center gap-2">
                <span class="text-[#e05730] font-bold">&gt;</span> {$t("contact.messageLabel")}
              </label>
              <textarea
                id="v1-message"
                name="message"
                required
                rows="4"
                placeholder={$t("contact.messagePlaceholder")}
                class="tf-v1-input w-full px-5 py-3.5 text-sm font-sans placeholder-stone-500 transition-all resize-y min-h-[120px]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              class="tf-v1-btn w-full mt-2 font-bold text-xs uppercase tracking-wider px-6 py-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {#if status === "loading"}
                <span>{$t("contact.sending")}</span>
              {:else if status === "success"}
                <span class="text-white font-bold">{$t("contact.successMsg")}</span>
              {:else if status === "error"}
                <span class="text-red-200">Error. Try again.</span>
              {:else}
                <span>[ENTER] {$t("contact.sendBtn")}</span>
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
    font-family: "JetBrains Mono", monospace;
    letter-spacing: -0.02em;
  }
  .desc-v2 {
    font-size: calc(0.95rem * 0.9);
    line-height: 1.8;
    max-width: 54ch;
  }
  .terminal-form-v1 {
    background-color: #121110;
    border: 1px solid #2b2724;
    border-radius: 0px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  }
  .tf-v1-header {
    background-color: #1a1816;
    border-bottom: 1px solid #2b2724;
    color: #a8a29e;
  }
  .tf-v1-dot {
    background-color: #e05730;
    opacity: 0.85;
  }
  .tf-v1-input {
    background-color: #161514;
    border: 1px solid #2b2724;
    color: #f5f5f4;
    border-radius: 0px;
  }
  .tf-v1-input:focus {
    border-color: #e05730;
    background-color: #1a1816;
    outline: none;
  }
  .tf-v1-btn {
    background-color: #e05730;
    color: #ffffff;
    border-radius: 0px;
  }
  .tf-v1-btn:hover {
    background-color: #f06a45;
  }
</style>
