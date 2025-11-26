import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  private menuMinimizedSubject = new BehaviorSubject<boolean>(false);

  darkMode$ = this.darkModeSubject.asObservable();
  menuMinimized$ = this.menuMinimizedSubject.asObservable();

  constructor() {
    // Carregar preferências do localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedMenuState = localStorage.getItem('menuMinimized') === 'true';
    
    this.darkModeSubject.next(savedDarkMode);
    this.menuMinimizedSubject.next(savedMenuState);
    
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode() {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem('darkMode', String(newValue));
    
    if (newValue) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleMenu() {
    const newValue = !this.menuMinimizedSubject.value;
    this.menuMinimizedSubject.next(newValue);
    localStorage.setItem('menuMinimized', String(newValue));
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  get isMenuMinimized(): boolean {
    return this.menuMinimizedSubject.value;
  }
}
