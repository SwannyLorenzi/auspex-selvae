import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { CharacterService } from './services/character.service';
import { DemonlordComponent } from './demonlord';

describe('DemonlordComponent', () => {
  let component: DemonlordComponent;
  let fixture: ComponentFixture<DemonlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonlordComponent, RouterLink],
      providers: [
        provideRouter([{ path: 'demonlord/:characterId', component: DemonlordComponent }]),
        CharacterService,
      ],
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
