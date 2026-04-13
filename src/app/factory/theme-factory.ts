import { InjectionToken } from "@angular/core";

export interface ThemeConfig{
    theme: 'light' | 'dark',
}

export const THEME_CONFIG = new InjectionToken<ThemeConfig>('theme.config', {
    providedIn: 'root',
    factory:() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (isDarkMode) {
      return {
        theme: 'dark',
      };
    }
    return {
      theme: 'light' ,
    };
  },
});


