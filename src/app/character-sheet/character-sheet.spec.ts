import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSheet } from './character-sheet';

(globalThis as { $localize?: (msg: string) => string }).$localize = (msg: string) => msg;

describe('CharacterSheet', () => {
  let component: CharacterSheet;
  let fixture: ComponentFixture<CharacterSheet>;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [CharacterSheet],
    }).createComponent(CharacterSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
