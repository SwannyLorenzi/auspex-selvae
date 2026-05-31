import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloWorld } from './hello-world';

(globalThis as { $localize?: (msg: string) => string }).$localize = (msg: string) => msg;

describe('HelloWorld', () => {
   let component: HelloWorld;
   let fixture: ComponentFixture<HelloWorld>;

   beforeEach(async () => {
     fixture = await TestBed.configureTestingModule({
       imports: [HelloWorld],
       }).createComponent(HelloWorld);
     component = fixture.componentInstance;
     fixture.detectChanges();
     });

   it('should create the component', () => {
     expect(component).toBeTruthy();
     });

   it('should display "Hello World" text', () => {
     const compiled = fixture.nativeElement as HTMLElement;
     expect(compiled.querySelector('h1')?.textContent).toContain('Hello World');
     });
});
