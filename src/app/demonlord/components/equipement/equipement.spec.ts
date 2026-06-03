import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipementComponent } from './equipement';
import { characterData } from '../../demonlord-data';

describe('EquipementComponent', () => {
  let component: EquipementComponent;
  let fixture: ComponentFixture<EquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementComponent],
     }).compileComponents();

    fixture = TestBed.createComponent(EquipementComponent);
    component = fixture.componentInstance;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    });

  it('should display currency', () => {
    component.currency = characterData.currency;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('or');
    });

  it('should display all equipment items', () => {
    component.equipment = characterData.equipment;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Hache de bataille');
    expect(container.textContent).toContain('Grand Bouclier');
    expect(container.textContent).toContain('Insigne du Duc');
    });
});
