import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentComponent } from './equipment';
import { characterData } from '../../demonlord-data';

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currency', characterData.currency);
    fixture.componentRef.setInput('equipment', characterData.equipment);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display currency', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('or');
  });

  it('should display all equipment items', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Hache de bataille');
    expect(container.textContent).toContain('Grand Bouclier');
    expect(container.textContent).toContain('Insigne du Duc');
  });
});
