import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-router-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './router-shell.html',
  styleUrls: ['./router-shell.css'],
})
export class RouterShellComponent {
  private router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}