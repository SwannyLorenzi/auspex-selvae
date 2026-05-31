import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Potions } from './potions';

describe('Potions', () => {
  let fixture: ComponentFixture<Potions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Potions],
     }).compileComponents();

    fixture = TestBed.createComponent<Potions>(Potions);
   });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
   });
});
