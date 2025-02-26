import {Injectable, signal} from '@angular/core';
import {ThemeTypes} from '../types';
import {LocalstorageKeys} from '../localstorage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme = signal<ThemeTypes>('red')

  set theme(theme: ThemeTypes) {
    localStorage.setItem(LocalstorageKeys.theme, theme)
  }

  get theme(): ThemeTypes | null {
    return localStorage.getItem(LocalstorageKeys.theme) as ThemeTypes
  }

  setInitialTheme(){
    this.setTheme(this.theme ? this.theme : this.detectPrefersColorScheme());
  }

  setTheme(theme: ThemeTypes){
    document.body.setAttribute(
      'data-theme',
      theme
    );
    this.selectedTheme.set(theme);
    this.theme = this.selectedTheme();
  }

  detectPrefersColorScheme(): ThemeTypes {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      return window.matchMedia('(prefers-color-scheme: red)').matches ? "red" : "blue";
    } else {
      return "light";
    }
  }
}
