import { Component } from '@angular/core';
import { HelloWorld } from './hello-world/hello-world';

@Component({
   selector: 'app-root',
   imports: [HelloWorld],
   templateUrl: './app.html',
   styleUrl: './app.scss',
})
export class App {}
