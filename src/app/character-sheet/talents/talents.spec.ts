import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Talents } from './talents';

describe('Talents', () => {
  let fixture: ComponentFixture<Talents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Talents],
    }).compileComponents();

    fixture = TestBed.createComponent<Talents>(Talents);
  });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
  });
});
