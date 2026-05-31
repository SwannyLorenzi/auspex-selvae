import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Progression } from './progression';

describe('Progression', () => {
  let fixture: ComponentFixture<Progression>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Progression],
      }).compileComponents();

    fixture = TestBed.createComponent<Progression>(Progression);
    });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
    });
});
