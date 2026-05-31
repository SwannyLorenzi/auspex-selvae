import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Professions } from './professions';

describe('Professions', () => {
  let fixture: ComponentFixture<Professions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Professions],
      }).compileComponents();

    fixture = TestBed.createComponent<Professions>(Professions);
    });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
    });
});
