import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentComponent } from './equipment';
import { Character } from '../../demonlord-models';
import { MoneyData } from '../money/money-models';

const mockCharacter: Partial<Character> = {
  money: { couronnes: 28, chelins: 3, sous: 4, eclats: 0 } as MoneyData,
};

const mockEquipment: Character['equipment'] = [
  { name: 'Hache de bataille', effect: '1d6+2 dégâts' },
  { name: 'Grand Bouclier', effect: 'Defense + 2' },
];

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.componentRef.setInput('equipment', mockEquipment);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display money values', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('28');
    expect(container.textContent).toContain('co');
  });

  it('should display all equipment items', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Hache de bataille');
    expect(container.textContent).toContain('Grand Bouclier');
  });
});
