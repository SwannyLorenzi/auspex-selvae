import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

(globalThis as { $localize?: (msg: string) => string }).$localize = (msg: string) => msg;

describe('App', () => {
   let component: App;
   let fixture: ComponentFixture<App>;

   beforeEach(async () => {
     fixture = await TestBed.configureTestingModule({
       imports: [App],
      }).createComponent(App);
     component = fixture.componentInstance;
     fixture.detectChanges();
     });

   it('should create the app', () => {
     expect(component).toBeTruthy();
     });

   it('should render title', () => {
     const compiled = fixture.nativeElement as HTMLElement;
     expect(compiled.querySelector('h1')?.textContent).toContain('Hello World');
     });
});
