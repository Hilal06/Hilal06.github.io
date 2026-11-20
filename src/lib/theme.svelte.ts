export type Theme = 'light';

class ThemeState {
  current = $state<Theme>('light');

  constructor() {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('light-mode');
    }
  }

  setTheme(_theme: Theme = 'light') {
    this.current = 'light';
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('light-mode');
    }
  }
}

export const themeState = new ThemeState();
