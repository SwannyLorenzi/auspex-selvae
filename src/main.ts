import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Polyfill for Angular i18n (used by templates with i18n attributes)
(globalThis as { $localize?: (msg: string) => string }).$localize = (msg: string) => msg;

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
