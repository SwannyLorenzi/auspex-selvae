import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterBrewerComponent } from './master-brewer';
import { characterData } from '../../demonlord-data';

describe('MasterBrewerComponent', () => {
  let component: MasterBrewerComponent;
  let fixture: ComponentFixture<MasterBrewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterBrewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterBrewerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('potions', characterData.potions);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all potions', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Cocktail de Caecras');
    expect(container.textContent).toContain('Potion de Puissance');
    expect(container.textContent).toContain('Potion de soin');
  });

  it('should display potion effects', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Force +1');
  });
});
