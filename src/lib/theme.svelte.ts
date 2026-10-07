export type Theme = 'light';

class ThemeState {
  current = $state<Theme>('light');

  constructor() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme', 'light');
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }

  setTheme(theme: Theme = 'light') {
    this.current = 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme', 'light');
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }

  toggleTheme = () => {
    // Permanent light mode
    this.setTheme('light');
  };
}

export const themeState = new ThemeState();
