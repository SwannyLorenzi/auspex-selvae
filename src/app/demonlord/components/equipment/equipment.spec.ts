import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentComponent } from './equipment';
import { Character } from '../../demonlord-models';
import { MoneyData } from '../money/money-models';
import { MoneyComponent } from '../money/money';
import type { WeaponEquipment, ArmorEquipment, InventoryEquipment } from './equipment-models';

const mockMoney: MoneyData = { totalShards: 28034 };

const mockCharacter: Character = {
  id: 'test-char',
  name: 'Test',
  nickname: '',
  description: '',
  progression: { level: '1', ascendance: '-', apprentice: '-', expert: '-', master: '-' },
  professions: [],
  attributes: {
    force: 10, intellect: 10, agility: 10, willpower: 10, perception: 10,
    health: 10, speed: 10, size: 10, spellpower: 10, healingRate: 10, defense: 10,
    damage: 0, madness: 0, corruption: 0,
  },
  immunities: [],
  activeAfflictions: [],
  talents: [],
  magic: { power: 0, spells: [] },
  potions: [],
  money: mockMoney,
  defense: 10,
  equipment: [],
};

const mockEquipment: (WeaponEquipment | ArmorEquipment | InventoryEquipment)[] = [
  {
    name: 'Hache de bataille',
    category: 'weapon',
    damage: '1d6+2',
    hands: 'one',
    properties: [],
  },
  {
    name: 'Grand Bouclier',
    category: 'armor',
    defenseBonus: '+2',
  },
  {
    name: 'Potion de soin',
    category: 'inventory',
    quantity: 2,
    description: 'soin = vitesse de guerison',
  },
];

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentComponent, MoneyComponent],
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
    expect(container.textContent).toContain('Potion de soin');
  });

  it('should display weapon details', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('1d6+2');
    expect(container.textContent).toContain('one');
  });

  it('should display inventory quantity', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('x2');
  });
});
