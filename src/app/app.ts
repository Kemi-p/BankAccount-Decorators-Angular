import { Component, signal, computed, inject } from '@angular/core';
import { THEME_CONFIG } from './factory/theme-factory';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  themeConfig = inject(THEME_CONFIG)

   ngOnInit() {
    this.applyTheme();
  }

  applyTheme() {
  const body = document.body;

  if (this.themeConfig.theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
}
  private router = inject(Router);

  navigateToBank(){
    this.router.navigate(['/bank'])
  }

  navigateToClient(){
    this.router.navigate(['/client'])
  }

  navigateToLoan(){
    this.router.navigate(['/loan'])
  }
 
}
