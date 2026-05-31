import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Characteristics } from './characteristics';

describe('Characteristics', () => {
  let fixture: ComponentFixture<Characteristics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Characteristics],
    }).compileComponents();

    fixture = TestBed.createComponent<Characteristics>(Characteristics);
  });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
  });
});
