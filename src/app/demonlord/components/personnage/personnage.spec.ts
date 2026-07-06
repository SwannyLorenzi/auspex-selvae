import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonnageComponent } from './personnage';
import { characterData } from '../../demonlord-data';

describe('PersonnageComponent', () => {
  let component: PersonnageComponent;
  let fixture: ComponentFixture<PersonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the character name', () => {
    component.character = characterData;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('7 7');
    expect(container.textContent).toContain('La Tavernière');
  });

  it('should display the character description', () => {
    component.character = characterData;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('femme humaine');
  });
});
