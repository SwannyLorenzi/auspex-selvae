import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacteristicsComponent } from './characteristics';
import { characterData } from '../../demonlord-data';
import { CharacterService } from '../../services/character.service';

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicsComponent],
      providers: [
        {
          provide: CharacterService,
          useValue: {
            updateAttribute: () => true,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', characterData);
    fixture.componentRef.setInput('characterId', characterData.id);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all core stats', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Force');
    expect(container.textContent).toContain('Intellect');
    expect(container.textContent).toContain('Agilité');
    expect(container.textContent).toContain('Volonté');
    expect(container.textContent).toContain('Perception');
  });

  it('should display secondary attributes', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Gabarit');
    expect(container.textContent).toContain('Vitesse');
    expect(container.textContent).toContain('Folie');
  });

  it('should display health as a vertex', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Santé');
  });

  it('should display damage as center circle', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('DÉGÂTS');
  });
});
