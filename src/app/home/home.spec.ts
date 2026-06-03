import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
       }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
     });

  it('should create', () => {
    expect(component).toBeTruthy();
      });

  it('should display the title', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('auspex-selvae');
      });

  it('should display the character sheet link', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('7 7');
    expect(container.textContent).toContain('La Tavernière');
      });

  it('should have a link to the demonlord page', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toContain('demonlord');
      });
});
