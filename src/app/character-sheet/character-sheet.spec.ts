import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSheet } from './character-sheet';
import { Identity } from './identity/identity';
import { Progression } from './progression/progression';
import { Professions } from './professions/professions';
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
        Identity,
        Progression,
        Professions,
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

  it('should render identity component', () => {
    const identity = fixture.nativeElement.querySelector('app-identity');
    expect(identity).toBeTruthy();
      });

  it('should render progression component', () => {
    const progression = fixture.nativeElement.querySelector('app-progression');
    expect(progression).toBeTruthy();
      });

  it('should render professions component', () => {
    const professions = fixture.nativeElement.querySelector('app-professions');
    expect(professions).toBeTruthy();
      });

  it('should render characteristics component', () => {
    const characteristics = fixture.nativeElement.querySelector('app-characteristics');
    expect(characteristics).toBeTruthy();
      });
});
