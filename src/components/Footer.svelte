<script lang="ts">
  import profileData from "../data/profile.json";
  import { magnetic } from "../lib/actions";
  import { t } from "../lib/i18n";

  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
</script>

<footer class="border-t border-[var(--color-border)] bg-[var(--color-surface-overlay)] z-10 relative text-sm text-[var(--color-ink-secondary)]">
  <div
    class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 flex flex-col gap-8"
  >
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)] pb-8"
    >
      <div>
        <div
          class="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-2"
        >
          ENGINEER PORTFOLIO // END OF FILE
        </div>
        <div
          class="index-title font-extrabold text-[var(--color-ink-primary)] tracking-[-0.03em] leading-none font-mono"
        >
          {profileData.fullName}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/Hilal06"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 border border-[var(--color-border)] hover:border-[var(--color-ink-primary)] text-[var(--color-ink-primary)] hover:bg-[var(--color-surface)] font-mono text-xs uppercase tracking-wider transition-all"
        >
          [GITHUB]
        </a>
        <a
          href={`mailto:${profileData.contact.email}`}
          class="px-4 py-2 border border-[var(--color-border)] hover:border-[var(--color-ink-primary)] text-[var(--color-ink-primary)] hover:bg-[var(--color-surface)] font-mono text-xs uppercase tracking-wider transition-all"
        >
          [EMAIL]
        </a>
        <button
          use:magnetic
          onclick={scrollToTop}
          class="magnetic-btn px-4 py-2 bg-[var(--color-ink-primary)] text-white hover:bg-[var(--color-accent-500)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          aria-label="Scroll back to top"
        >
          ▲ ASCEND
        </button>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs text-[var(--color-ink-secondary)]"
    >
      <div>
        <span class="text-[var(--color-ink-muted)] block text-[10px] uppercase tracking-wider"
          >COPYRIGHT</span
        >
        <span class="text-[var(--color-ink-primary)] font-medium"
          >&copy; {currentYear} ALL RIGHTS RESERVED</span
        >
      </div>
      <div>
        <span class="text-[var(--color-ink-muted)] block text-[10px] uppercase tracking-wider"
          >FOUNDATION</span
        >
        <span class="text-[var(--color-ink-primary)] font-medium">{$t("footer.builtWith")}</span>
      </div>
      <div>
        <span class="text-[var(--color-ink-muted)] block text-[10px] uppercase tracking-wider"
          >SYSTEM DISCIPLINE</span
        >
        <span class="text-[var(--color-ink-primary)] font-medium">READY // FOR HIRE</span>
      </div>
      <div>
        <span class="text-[var(--color-ink-muted)] block text-[10px] uppercase tracking-wider"
          >RUNTIME STATUS</span
        >
        <span class="text-[var(--color-status-ok)] font-bold">● SYSTEM OPERATIONAL</span>
      </div>
    </div>
  </div>
</footer>

<style>
  .index-title {
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  }
</style>
