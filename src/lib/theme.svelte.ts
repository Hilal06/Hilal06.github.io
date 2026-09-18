export type Theme = 'dark' | 'light';

class ThemeState {
  current = $state<Theme>('dark');

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme') as Theme;
      if (saved === 'dark' || saved === 'light') {
        this.current = saved;
      }
    }
  }

  setTheme(theme: Theme) {
    this.current = theme;
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

  toggleTheme = () => {
    const next = this.current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  };
}

export const themeState = new ThemeState();
