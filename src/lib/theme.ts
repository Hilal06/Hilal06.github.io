import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio_theme') as Theme;
    if (saved === 'dark' || saved === 'light') return saved;
  }
  return 'dark';
};

export const currentTheme = writable<Theme>(getInitialTheme());

export function setTheme(theme: Theme) {
  currentTheme.set(theme);
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }
  }
}

export function toggleTheme() {
  currentTheme.update((prev) => {
    const next = prev === 'dark' ? 'light' : 'dark';
    setTheme(next);
    return next;
  });
}
