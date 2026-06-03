import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrandBrasseurComponent } from './grand-brasseur';
import { characterData } from '../../demonlord-data';

describe('GrandBrasseurComponent', () => {
  let component: GrandBrasseurComponent;
  let fixture: ComponentFixture<GrandBrasseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrandBrasseurComponent],
     }).compileComponents();

    fixture = TestBed.createComponent(GrandBrasseurComponent);
    component = fixture.componentInstance;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    });

  it('should display all potions', () => {
    component.potions = characterData.potions;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Cocktail de Caecras');
    expect(container.textContent).toContain('Potion de Puissance');
    expect(container.textContent).toContain('Potion de soin');
    });

  it('should display potion effects', () => {
    component.potions = characterData.potions;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Force +1');
    });
});
