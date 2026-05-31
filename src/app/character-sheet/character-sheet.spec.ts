import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSheet } from './character-sheet';
import { TopRow } from './top-row/top-row';
import { Characteristics } from './characteristics/characteristics';
import { Talents } from './talents/talents';
import { Magic } from './magic/magic';
import { Potions } from './potions/potions';
import { Equipment } from './equipment/equipment';

(globalThis as { $localize?: (msg: string) => string }).$localize = (msg: string) => msg;

describe('CharacterSheet', () => {
  let component: CharacterSheet;
  let fixture: ComponentFixture<CharacterSheet>;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [
        CharacterSheet,
        TopRow,
        Characteristics,
        Talents,
        Magic,
        Potions,
        Equipment,
      ],
      }).compileComponents();

    component = fixture.componentInstance;
    fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    });

  it('should render top-row component', () => {
    const topRow = fixture.nativeElement.querySelector('app-top-row');
    expect(topRow).toBeTruthy();
    });

  it('should render characteristics component', () => {
    const characteristics = fixture.nativeElement.querySelector('app-characteristics');
    expect(characteristics).toBeTruthy();
    });
});
