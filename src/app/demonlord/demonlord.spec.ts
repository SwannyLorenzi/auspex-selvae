import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DemonlordComponent } from './demonlord';

describe('DemonlordComponent', () => {
  let component: DemonlordComponent;
  let fixture: ComponentFixture<DemonlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonlordComponent],
      providers: [provideRouter([])],
      }).compileComponents();

    fixture = TestBed.createComponent(DemonlordComponent);
    component = fixture.componentInstance;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    });

  it('should display the character sheet title', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Ombre du Seigneur Démon');
    });

  it('should display the character name', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('7 7');
    });
});
