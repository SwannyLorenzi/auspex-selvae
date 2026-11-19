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
    fixture.componentRef.setInput('data', characterData.attributes);
    fixture.componentRef.setInput('characterId', characterData.id);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all core stats', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('FORCE');
    expect(container.textContent).toContain('INTELLECT');
    expect(container.textContent).toContain('AGILITÉ');
    expect(container.textContent).toContain('VOLONTÉ');
    expect(container.textContent).toContain('PERCEPTION');
  });

  it('should display secondary attributes', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('GABARIT');
    expect(container.textContent).toContain('VITESSE');
    expect(container.textContent).toContain('FOLIE');
  });

  it('should display health as a vertex', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('SANTÉ');
  });

  it('should display damage as center circle', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('DÉGÂTS');
  });
});
