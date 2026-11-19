import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterService } from './services/character.service';
import { DemonlordComponent } from './demonlord';
import { characterData } from './demonlord-data';

describe('DemonlordComponent', () => {
  let component: DemonlordComponent;
  let fixture: ComponentFixture<DemonlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DemonlordComponent],
      providers: [
        {
          provide: CharacterService,
          useValue: {
            getCharacter: () => signal({ ...characterData }),
            updateAttribute: () => true,
            updateMoney: () => { /* noop */ },
            resetCharacter: () => { /* noop */ },
            updateActiveAfflictions: () => { /* noop */ },
          },
        },
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
