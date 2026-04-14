import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { RouterShellComponent } from './app/root(routershell)/router-shell';

bootstrapApplication(RouterShellComponent, appConfig).catch((err) => console.error(err));
